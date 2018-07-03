'use strict';
(function () {
// Заполним блок .big-picture данными из первого элемента сгенерированного массива
  var bigPicture = document.querySelector('.big-picture');
  var renderMainPost = function (mainPost) {
    var pictureSection = document.querySelector('.big-picture');
    var commentsList = pictureSection.querySelector('.social__comments');
    var fragment = document.createDocumentFragment();
    var comment;

    pictureSection.querySelector('.social__caption').textContent = mainPost.getRandomPostDescription;
    pictureSection.querySelector('.big-picture__img img').src = mainPost.url;
    pictureSection.querySelector('.likes-count').textContent = mainPost.likes;
    for (var i = 0; i < mainPost.comments.length; i++) {
      comment = window.pictures.createCommentTemplate(mainPost.comments[i]);
      fragment.appendChild(comment);
    }

    commentsList.appendChild(fragment);
  };

  var allPosts;

  var onLoad = function (data) {
    var fragment = document.createDocumentFragment();
    window.pictures.showPosts(window.data.picturesList, fragment, data);
    allPosts = data;
  };


  var onError = function (errorMessage) {
    var node = document.createElement('div');

    node.style.margin = '0 auto';
    node.style.textAlign = 'center';
    node.style.backgroundColor = 'red';
    node.style.position = 'relative';
    node.style.padding = '20px 100px';
    node.style.fontSize = '30px';
    node.style.color = 'white';
    node.textContent = errorMessage;
    document.querySelector('.pictures').insertAdjacentElement('afterend', node);
  };

  window.backend.load(onLoad, onError);

  // var allPosts = window.backend.load(onLoad, onError);
  //var postsFragment = document.createDocumentFragment();
  //window.pictures.showPosts(window.data.picturesList, postsFragment, allPosts);

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

  // отображаем нужный пост по клику
  window.data.picturesList.addEventListener('click', function (evt) {
    // находим индекс картинки(data-index), которую мы кликнули
      if (evt.target.getAttribute('data-index')) {
        var target = evt.target;
        var dataIndex = target.getAttribute('data-index');
        bigPicture.classList.remove('hidden');
        renderMainPost(allPosts[dataIndex]);
      }
    });
})();
