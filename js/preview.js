'use strict';
(function () {
// Заполним блок .big-picture данными из первого элемента сгенерированного массива
var renderMainPost = function (mainPost) {
  var pictureSection = document.querySelector('.big-picture');
  var commentsList = pictureSection.querySelector('.social__comments');

  pictureSection.querySelector('.social__caption').textContent = mainPost.getRandomPostDescription;
  pictureSection.querySelector('.big-picture__img img').src = mainPost.getRandomPostUrl;
  pictureSection.querySelector('.likes-count').textContent = mainPost.getRandomPostLikes;
  var comment = window.pictures.createCommentTemplate(mainPost.getRandomPostComments);
  commentsList.appendChild(comment);
};


var allPosts = window.data.getRandomPosts(window.data.POSTS_COUNT);
var postsFragment = document.createDocumentFragment();
window.pictures.showPosts(window.data.picturesList, postsFragment, allPosts);

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

window.preview = {
  renderMainPost: renderMainPost
};

})();
