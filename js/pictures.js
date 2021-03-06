'use strict';

(function () {
// отобразить один пост
  var photoTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture__link');
  var renderPost = function (post, index) {
    var postElement = photoTemplate.cloneNode(true);
    postElement.querySelector('.picture__img').src = post.url;
    postElement.querySelector('.picture__img').dataset.index = index;
    postElement.querySelector('.picture__stat--likes').textContent = post.likes;
    postElement.querySelector('.picture__stat--comments').textContent = post.comments;
    return postElement;
  };

  // отображаем посты
  var showPosts = function (parent, fragment, data) {
    for (var i = 0; i < data.length; i++) {
      fragment.appendChild(renderPost(data[i], i));
    }
    parent.appendChild(fragment);
  };

  var createCommentTemplate = function (textMessage) {
    var comment = document.createElement('li');
    var commentImg = document.createElement('img');
    var commentText = document.createElement('p');

    // добавляем нужные классы
    comment.classList.add('social__comment');
    commentImg.classList.add('social__picture');
    commentText.classList.add('social__text');

    commentImg.src = 'img/avatar-' + window.data.getRandomNumber(1, 6) + '.svg';
    commentText.textContent = textMessage;

    comment.appendChild(commentImg);
    comment.appendChild(commentText);

    return comment;
  };

  window.pictures = {
    showPosts: showPosts,
    createCommentTemplate: createCommentTemplate
  };
})();
