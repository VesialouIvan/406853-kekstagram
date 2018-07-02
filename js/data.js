'use strict';

(function () {
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

  window.data = {
    POSTS_COUNT: POSTS_COUNT,
    photoTemplate: photoTemplate,
    picturesList: picturesList,
    getRandomNumber: getRandomNumber,
    getRandomPosts: getRandomPosts
  };
})();
