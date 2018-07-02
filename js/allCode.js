'use strict';

// запишем массивы
var PICTURE_COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var PICTURE_DESCRIPTIONS = ['Тестим новую камеру!', 'Затусили с друзьями на море', 'Как же круто тут кормят', 'Отдыхаем...',
  'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......', 'Вот это тачка!'];
var MIN_LIKES = 15;
var MAX_LIKES = 200;
var POSTS_COUNT = 25;

var photoTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture__link');
var picturesList = document.querySelector('.pictures');

// функция, выдающая случайное число
var getRandomNumber = function (min, max) {
  var random = min + Math.random() * (max + 1 - min);
  random = Math.floor(random);
  return random;
};

// получаем случайный элемент из каждого массива
var getRandomElement = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

var getPhotoUrl = function (index) {
  var postUrl = 'photos/' + (index + 1) + '.jpg';
  return postUrl;
};

// получаем случайный пост
var createRandomPost = function (index) {
  return {
    getRandomPostUrl: getPhotoUrl(index),
    getRandomPostLikes: getRandomNumber(MIN_LIKES, MAX_LIKES),
    getRandomPostComments: getRandomElement(PICTURE_COMMENTS),
    getRandomPostDescription: getRandomElement(PICTURE_DESCRIPTIONS)
  };
};

// получаем 25 случайных постов
var getRandomPosts = function (num) {
  var randomPosts = [];
  for (var i = 0; i < num; i++) {
    randomPosts.push(createRandomPost(i));
  }
  return randomPosts;
};

// отобразить один пост
var renderPost = function (post, index) {
  var postElement = photoTemplate.cloneNode(true);
  postElement.querySelector('.picture__img').src = post.getRandomPostUrl;
  postElement.querySelector('.picture__img').dataset.index = index;
  postElement.querySelector('.picture__stat--likes').textContent = post.getRandomPostLikes;
  postElement.querySelector('.picture__stat--comments').textContent = post.getRandomPostComments;
  return postElement;
};

// отображаем посты
var showPosts = function (parent, fragment, data) {
  for (var i = 0; i < data.length; i++) {
    fragment.appendChild(renderPost(data[i], i));
  }
  parent.appendChild(fragment);
};

// удалим класс hidden у блока .big-picture
var bigPicture = document.querySelector('.big-picture');


var createCommentTemplate = function (textMessage) {
  var comment = document.createElement('li');
  var commentImg = document.createElement('img');
  var commentText = document.createElement('p');

  // добавляем нужные классы
  comment.classList.add('social__comment');
  commentImg.classList.add('social__picture');
  commentText.classList.add('social__text');

  commentImg.src = 'img/avatar-' + getRandomNumber(1, 6) + '.svg';
  commentText.textContent = textMessage;

  comment.appendChild(commentImg);
  comment.appendChild(commentText);

  return comment;
};

// Заполним блок .big-picture данными из первого элемента сгенерированного массива
var renderMainPost = function (mainPost) {
  var pictureSection = document.querySelector('.big-picture');
  var commentsList = pictureSection.querySelector('.social__comments');

  pictureSection.querySelector('.social__caption').textContent = mainPost.getRandomPostDescription;
  pictureSection.querySelector('.big-picture__img img').src = mainPost.getRandomPostUrl;
  pictureSection.querySelector('.likes-count').textContent = mainPost.getRandomPostLikes;
  var comment = createCommentTemplate(mainPost.getRandomPostComments);
  commentsList.appendChild(comment);
};

var allPosts = getRandomPosts(POSTS_COUNT);
var postsFragment = document.createDocumentFragment();
showPosts(picturesList, postsFragment, allPosts);

document.querySelector('.social__comment-count').classList.add('visually-hidden');
document.querySelector('.social__loadmore').classList.add('visually-hidden');

// отображаем
var uploadField = document.querySelector('#upload-file');
var imgEditor = document.querySelector('.img-upload__overlay');
var cancelButton = document.querySelector('.img-upload__cancel');
uploadField.addEventListener('change', function () {
  imgEditor.classList.remove('hidden');
  // фото без фильтра при открытии
  document.querySelector('.img-upload__scale').setAttribute('style', 'display: none;');
});

cancelButton.addEventListener('click', function () {
  imgEditor.classList.add('hidden');
});

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
picturesList.addEventListener('click', function (evt) {
  // находим индекс картинки(data-index), которую мы кликнули
  if (evt.target.getAttribute('data-index')) {
    var target = evt.target;
    var dataIndex = target.getAttribute('data-index');
    bigPicture.classList.remove('hidden');
    renderMainPost(allPosts[dataIndex]);
  }
});

// по нажатию на крестик .big-picture__cancel закрываем блок с фото
var pictureCancel = document.querySelector('.big-picture__cancel');
pictureCancel.addEventListener('click', function () {
  bigPicture.classList.add('hidden');
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