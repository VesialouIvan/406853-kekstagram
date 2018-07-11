'use strict';

(function () {
  var RESIZE_STEP = 0.25;
  var MIN_SCALE = 0.25;
  var MAX_SCALE = 1;
  var MAX_HASHTAG_LENGTH = 20;
  var uploadPhoto = document.querySelector('.img-upload__preview img');
  var effectsList = document.querySelector('.effects__list');

  var filters = {
    'filter-chrome': function (value) {
      return 'filter: grayscale(' + value / 100 + ')';
    },
    'filter-sepia': function (value) {
      return 'filter: sepia(' + value / 100 + ')';
    },
    'filter-marvin': function (value) {
      return 'filter: invert(' + value + '%)';
    },
    'filter-phobos': function (value) {
      return 'filter: blur(' + value / 100 * 3 + 'px)';
    },
    'filter-heat': function (value) {
      return 'filter: brightness(' + (value / 100 * 2 + 1) + ')';
    }
  };

  var activeFilter;
  var uploadScale = document.querySelector('.img-upload__scale');
  effectsList.addEventListener('click', function (evt) {
    uploadPhoto.removeAttribute('style');
    activeFilter = 'filter-' + evt.target.value;

    if (filters[activeFilter]) {
      uploadScale.removeAttribute('style');
      slideEffect.style.left = '0';
      scaleLevel.style.width = '0';
      filterValue.value = 0;
      uploadPhoto.setAttribute('style', filters[activeFilter](filterValue.value));
    } else {
      uploadScale.setAttribute('style', 'display: none;');
    }
    return activeFilter;
  });

  var validationRules = [
    {
      validate: function (element) {
        return element.value[0] === '#';
      },
      message: 'Хэш-тег должен начинаться с символа решетки'
    },
    {
      validate: function (element) {
        var hashTags = element.value.split(' ');
        for (var i = 0; i < hashTags.length; i++) {
          if (hashTags[i].length > MAX_HASHTAG_LENGTH) {
            return false;
          }
        }
        return true;
      },
      message: 'хэш-тег не может быть больше 20 символов'
    },
    {
      validate: function (element) {
        return !element.validity.tooShort;
      },
      message: 'хеш-тег не может состоять только из одной решётки'
    },
    {
      validate: function (element) {
        var hashTags = element.value.split(' ');
        var str;
        var index;
        for (var i = 0; i < hashTags.length; i++) {
          str = hashTags[i].substr(1);
          index = str.indexOf('#');
          if (index > -1) {
            return false;
          }
        }
        return true;
      },
      message: 'хэш-теги разделяются пробелами'
    },
    {
      validate: function (element) {
        var hashTags = element.value.toLowerCase().split(' ');
        var validateHashtag = hashTags.every(function (hashTag, pos, array) {
          var check = (pos === array.indexOf(hashTag)) && (pos === array.lastIndexOf(hashTag));
          return check;
        });
        return validateHashtag;
      },
      message: 'один и тот же хэш-тег не может быть использован дважды'
    },
    {
      validate: function (element) {
        var hashTags = element.value.split(' ');
        return hashTags.length <= 5;
      },
      message: 'нельзя указать больше пяти хэш-тегов'
    }
  ];

  var hashtagsInput = document.querySelector('.text__hashtags');
  hashtagsInput.addEventListener('input', function (evt) {
    var target = evt.target;
    for (var i = 0; i < validationRules.length; i++) {
      var rule = validationRules[i].validate(target);
      if (!rule) {
        var message = validationRules[i].message;
        hashtagsInput.style.borderColor = 'red';
        return target.setCustomValidity(message);
      }
    }
    hashtagsInput.removeAttribute('style');
    return target.setCustomValidity('');
  });

  var scaleLine = document.querySelector('.scale__line');
  var scaleLevel = scaleLine.querySelector('.scale__level');
  var slideEffect = scaleLine.querySelector('.scale__pin');
  var filterValue = document.querySelector('.scale__value');

  slideEffect.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX
      };

      startCoords = {
        x: moveEvt.clientX
      };

      var newValue = Math.max(Math.min(slideEffect.offsetLeft - shift.x, 450), 0) + 'px';

      scaleLevel.style.width = newValue;
      slideEffect.style.left = newValue;

      filterValue.value = Math.round(parseInt(slideEffect.style.left, 10) / 450 * 100);
      uploadPhoto.setAttribute('style', filters[activeFilter](filterValue.value));
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  var form = document.querySelector('.img-upload__form');
  var imgEditor = document.querySelector('.img-upload__overlay');

  var onSuccess = function () {
    form.reset();
    imgEditor.classList.add('hidden');
  };

  var onError = function (errorMessage) {
    var node = document.createElement('div');
    node.style.margin = 'auto';
    node.style.textAlign = 'center';
    node.style.backgroundColor = 'red';
    node.style.position = 'relative';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';
    node.style.color = 'white';
    node.textContent = errorMessage;
    document.querySelector('.img-upload__form').insertAdjacentElement('beforeend', node);
  };

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    if (hashtagsInput.validity.valid) {
      window.backend.save(onSuccess, onError, new FormData(form));
    }
  });

  var resizeMinus = document.querySelector('.resize__control--minus');
  var resizePlus = document.querySelector('.resize__control--plus');
  var resizeControl = document.querySelector('.resize__control--value');
  var uploadPreview = document.querySelector('.img-upload__preview');

  resizeMinus.addEventListener('mousedown', function () {
    var newValue = parseInt(resizeControl.value, 10) / 100 - RESIZE_STEP;
    newValue = newValue < MIN_SCALE ? MIN_SCALE : newValue;
    var scaleStyle = 'transform: scale(' + newValue + ')';
    uploadPreview.setAttribute('style', scaleStyle);
    resizeControl.value = newValue * 100 + '%';
  });

  resizePlus.addEventListener('mousedown', function () {
    var newValue = parseInt(resizeControl.value, 10) / 100 + RESIZE_STEP;
    newValue = newValue > MAX_SCALE ? MAX_SCALE : newValue;
    var scaleStyle = 'transform: scale(' + newValue + ')';
    uploadPreview.setAttribute('style', scaleStyle);
    resizeControl.value = newValue * 100 + '%';
  });
})();
