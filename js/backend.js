'use strict';

(function () {
  var URL = 'https://js.dump.academy/kekstagram';
  var sendRequest = function (method, url, onLoad, onError, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case 200:
          onLoad(xhr.response);
          break;
        case 400:
          onError(xhr.status + 'Неверный запрос');
          break;
        case 500:
          onError(xhr.status + 'Ошибка сервера');
          break;
        default:
          onError('Неизвестный статус' + xhr.status + xhr.statusText);
          break;
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000;

    xhr.open(method, url);

    xhr.send(data);

  };
  window.backend = {
    load: function (onLoad, onError) {
      sendRequest('GET', URL + '/data', onLoad, onError);
    },
    save: function (onLoad, onError, data) {
      sendRequest('POST', URL, onLoad, onError, data);
    }
  };
})();
