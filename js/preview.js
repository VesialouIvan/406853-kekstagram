'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500;
  var ESC_KEYCODE = 27;
  var VISIBLE_COMMENT_LAST_INDEX = 4;
  var bigPicture = document.querySelector('.big-picture');
  var pictureCancel = document.querySelector('.big-picture__cancel');
  pictureCancel.addEventListener('click', function () {
    bigPicture.classList.add('hidden');
  });

  var renderMainPost = function (mainPost) {
    var pictureSection = document.querySelector('.big-picture');
    var commentsList = pictureSection.querySelector('.social__comments');
    var fragment = document.createDocumentFragment();
    var comment;

    while (commentsList.children.length) {
      commentsList.removeChild(commentsList.children[0]);
    }

    pictureSection.querySelector('.social__caption').textContent = mainPost.getRandomPostDescription;
    pictureSection.querySelector('.big-picture__img img').src = mainPost.url;
    pictureSection.querySelector('.likes-count').textContent = mainPost.likes;
    for (var i = 0; i < mainPost.comments.length; i++) {
      comment = window.pictures.createCommentTemplate(mainPost.comments[i]);
      if (i > VISIBLE_COMMENT_LAST_INDEX) {
        comment.setAttribute('style', 'display: none;');
      }
      fragment.appendChild(comment);
    }
    commentsList.appendChild(fragment);
  };

  var allPosts;
  var filters = document.querySelector('.img-filters');

  var onLoad = function (data) {
    window.pictures.showPosts(data);
    allPosts = data;
    filters.classList.remove('img-filters--inactive');
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

  var filtersForm = document.querySelector('.img-filters__form');

  var filterPopular = function (arr) {
    return arr.filter(function (element) {
      return element.comments.length > 10;
    });
  };

  var filterNew = function (arr) {
    var filteredArr = [];
    while (filteredArr.length < 10) {
      var elem = window.data.getRandomElement(arr);
      if (filteredArr.indexOf(elem) === -1) {
        filteredArr.push(elem);
      }
    }
    return filteredArr;
  };

  var updatePhotos = function () {
    var filterChecked = document.querySelector('.img-filters__button--active').id;

    if (filterChecked === 'filter-popular') {
      window.pictures.showPosts(allPosts);
    }
    if (filterChecked === 'filter-new') {
      var filterNewPosts = filterNew(allPosts);
      window.pictures.showPosts(filterNewPosts);
    }
    if (filterChecked === 'filter-discussed') {
      var filteredPosts = filterPopular(allPosts);
      window.pictures.showPosts(filteredPosts);
    }
  };

  var updatePhotosDebounce = window.debounce(updatePhotos, DEBOUNCE_INTERVAL);

  filtersForm.addEventListener('click', function (evt) {
    document.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
    var target = evt.target;
    var pictures = document.querySelector('.pictures');
    target.classList.add('img-filters__button--active');

    while (pictures.children.length !== 2) {
      pictures.removeChild(pictures.children[2]);
    }
    updatePhotosDebounce();
  });

  document.querySelector('.social__comment-count').classList.add('visually-hidden');
  document.querySelector('.social__loadmore').classList.add('visually-hidden');

  var uploadForm = document.querySelector('.img-upload__form');
  var uploadField = document.querySelector('#upload-file');
  var imgEditor = document.querySelector('.img-upload__overlay');
  var cancelButton = document.querySelector('.img-upload__cancel');
  uploadField.addEventListener('change', function () {
    imgEditor.classList.remove('hidden');
    var resizeControl = document.querySelector('.resize__control--value');
    resizeControl.value = '100%';
    var scaleStyle = 'transform: scale(' + parseInt(resizeControl.value, 10) / 100 + ')';
    document.querySelector('.img-upload__preview').setAttribute('style', scaleStyle);
    document.querySelector('.img-upload__scale').setAttribute('style', 'display: none;');
  });

  cancelButton.addEventListener('click', function () {
    uploadForm.reset();
    imgEditor.classList.add('hidden');
  });
  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ESC_KEYCODE && !evt.target.classList.contains('text__hashtags') && !evt.target.classList.contains('text__description')) {
      uploadForm.reset();
      imgEditor.classList.add('hidden');
    }
  });

  window.data.picturesList.addEventListener('click', function (evt) {
    if (evt.target.getAttribute('data-index')) {
      var target = evt.target;
      var dataIndex = target.getAttribute('data-index');
      bigPicture.classList.remove('hidden');
      renderMainPost(allPosts[dataIndex]);

      var isEscapeExit = function (event) {
        if (event.keyCode === ESC_KEYCODE) {
          bigPicture.classList.add('hidden');
          document.removeEventListener('keydown', isEscapeExit);
        }
      };
      document.addEventListener('keydown', isEscapeExit);
    }
  });
})();
