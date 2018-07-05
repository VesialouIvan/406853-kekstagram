'use strict';

(function () {
  window.debounce = function (func, wait) {
    var timeout = 0;
    return function () {
      clearTimeout(timeout);
      timeout = setTimeout(func, wait);
    };
  };
})();
