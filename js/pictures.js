'use strict';

var photoTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture__link');

var picturesList = document.querySelector('.pictures');

// запишем массивы

var PICTURE_SRCS = ['photos/1', 'photos/2', 'photos/3', 'photos/4', 'photos/5', 'photos/6', 'photos/7', 'photos/8', 'photos/9', 'photos/10', 'photos/11', 'photos/12', 'photos/13', 'photos/14', 'photos/15', 'photos/16', 'photos/17', 'photos/18', 'photos/19', 'photos/20', 'photos/21', 'photos/22', 'photos/23', 'photos/24', 'photos/25'];
var PICTURE_COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var PICTURE_DESCRIPTIONS = ['Тестим новую камеру!', 'Затусили с друзьями на море', 'Как же круто тут кормят', 'Отдыхаем...', 'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......', 'Вот это тачка!'];
var MIN = 15;
var MAX = 200;

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

// получаем случайный пост
var createRandomPost = function () {
  return {
    getRandomPostUrl: getRandomElement(PICTURE_SRCS),
    getRandomPostLikes: getRandomNumber(MIN, MAX),
    getRandomPostComments: getRandomElement(PICTURE_COMMENTS),
    getRandomPostDescription: getRandomElement(PICTURE_DESCRIPTIONS)
  };
};

// получаем 25 случайных постов
var getRandomPosts = function (num) {
  var randomPosts = [];
  for (var i = 0; i < num; i++) {
    randomPosts.push(createRandomPost());
  }
  return randomPosts;
};

// отобразить один пост
var renderPost = function (post) {
  var postElement = photoTemplate.cloneNode(true);
  postElement.querySelector('picture__img').src = post.getRandomPostUrl;
  postElement.querySelector('.picture__stat--likes').textContent = post.getRandomPostLikes;
  postElement.querySelector('.picture__stat--comments').textContent = post.getRandomPostComments;
  return postElement;
};

// отображаем посты
var showPosts = function (parent, fragment, data) {
  for (var i = 0; i < data.length; i++) {
    fragment.appendChild(renderPost(data[i]));
  }
  parent.appendChild(fragment);
};

// удалим класс hidden у блока .big-picture
var bigPicture = document.querySelector('.big-picture');
bigPicture.classList.remove('hidden');

var allPosts = getRandomPosts(25);
var postsFragment = document.createDocumentFragment();
showPosts(picturesList, postsFragment, allPosts);
