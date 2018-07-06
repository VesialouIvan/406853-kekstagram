'use strict';

(function () {
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

  window.data = {
    // POSTS_COUNT: POSTS_COUNT,
    picturesList: picturesList,
    getRandomNumber: getRandomNumber,
    // getRandomPosts: getRandomPosts,
    getRandomElement: getRandomElement
  };
})();
