'use strict';

(function () {
  var picturesList = document.querySelector('.pictures');

  var getRandomNumber = function (min, max) {
    var random = min + Math.random() * (max + 1 - min);
    random = Math.floor(random);
    return random;
  };

  var getRandomElement = function (arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  };

  window.data = {
    picturesList: picturesList,
    getRandomNumber: getRandomNumber,
    getRandomElement: getRandomElement
  };
})();
