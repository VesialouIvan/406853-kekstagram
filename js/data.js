'use strict';

(function () {
  var picturesList = document.querySelector('.pictures');

  var getRandomNumber = function (min, max) {
    var random = min + Math.random() * (max + 1 - min);
    random = Math.floor(random);
    return random;
  };

  var getRandomElement = function (array) {
    return array[Math.floor(Math.random() * array.length)];
  };

  window.data = {
    picturesList: picturesList,
    getRandomNumber: getRandomNumber,
    getRandomElement: getRandomElement
  };
})();
