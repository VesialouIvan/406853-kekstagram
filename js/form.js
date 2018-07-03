'use strict';

(function () {
// удалим класс hidden у блока .big-picture
  var bigPicture = document.querySelector('.big-picture');

  // по нажатию на крестик .big-picture__cancel закрываем блок с фото
  var pictureCancel = document.querySelector('.big-picture__cancel');
  pictureCancel.addEventListener('click', function () {
    bigPicture.classList.add('hidden');
  });


  // редактирование и фильтры

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
  effectsList.addEventListener('click', function (evt) {
    uploadPhoto.removeAttribute('style');
    activeFilter = 'filter-' + evt.target.value;

    if (filters[activeFilter]) {
      document.querySelector('.img-upload__scale').removeAttribute('style');
      slideEffect.style.left = '0';
      scaleLevel.style.width = '0';
      filterValue.value = 0;
      uploadPhoto.setAttribute('style', filters[activeFilter](filterValue.value));
    } else {
      document.querySelector('.img-upload__scale').setAttribute('style', 'display: none;');
    }
    return activeFilter;
  });

  // отображаем нужный пост по клику
  window.data.picturesList.addEventListener('click', function (evt) {
  // находим индекс картинки(data-index), которую мы кликнули
    if (evt.target.getAttribute('data-index')) {
      var target = evt.target;
      var dataIndex = target.getAttribute('data-index');
      bigPicture.classList.remove('hidden');
      window.preview.renderMainPost(window.preview.allPosts[dataIndex]);
    }
  });

  // Хэш-теги

  var validationRules = [
    {
      validate: function (element) {
        return element.value[0] === '#';
      },
      message: 'Хэш-тег должен начинаться с символа решетки'
    },
    {
      validate: function (element) {
        return element.validity.tooShort ? false : true;
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
        var arr = element.value.split(' ');
        var validateHashtag = arr.every(function (elem, pos, array) {
          var check = (pos === array.indexOf(elem)) && (pos === array.lastIndexOf(elem));
          return check;
        });
        return validateHashtag;
      },
      message: 'один и тот же хэш-тег не может быть использован дважды'
    },
    {
      validate: function (element) {
        var hashTags = element.value.split(' ');
        return hashTags.length > 5 ? false : true;
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
        return target.setCustomValidity(message);
      }
    }
    return target.setCustomValidity('');
  });

  // оживляем ползунок и насыщенность эффектов

  var scaleLine = document.querySelector('.scale__line');
  var scaleLevel = scaleLine.querySelector('.scale__level');
  var slideEffect = scaleLine.querySelector('.scale__pin');
  var filterValue = document.querySelector('.scale__value');

  slideEffect.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX
      };

      startCoords = {
        x: moveEvt.clientX
      };

      scaleLevel.style.width = Math.max(Math.min(slideEffect.offsetLeft - shift.x, 450), 0) + 'px';
      slideEffect.style.left = Math.max(Math.min(slideEffect.offsetLeft - shift.x, 450), 0) + 'px';

      filterValue.value = Math.round(parseInt(slideEffect.style.left, 10) / 450 * 100);
      uploadPhoto.setAttribute('style', filters[activeFilter](filterValue.value));
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (event) {
          event.preventDefault();
          slideEffect.addEventListener('click', onClickPreventDefault);
        };
      }
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
