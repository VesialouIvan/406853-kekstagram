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
var getRandomNumber = function (min_Likes, max_Likes) {
  var random = MIN_LIKES + Math.random() * (MAX_LIKES + 1 - MIN_LIKES);
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
var renderPost = function (post) {
  var postElement = photoTemplate.cloneNode(true);
  postElement.querySelector('.picture__img').src = post.getRandomPostUrl;
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
renderMainPost(allPosts[0]);

document.querySelector('.social__comment-count').classList.add('visually-hidden');
document.querySelector('.social__loadmore').classList.add('visually-hidden');
