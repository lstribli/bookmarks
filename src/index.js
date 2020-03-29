import $ from 'jquery';
import { bookMarksList, renderInitialPage, renderAddBookmarkPage, renderBookMarksList } from './pages';

function start() {
  $('.js-addBookmarkPage').show();
  $('.js-initialPage').show();
  $('.js-bookmarkList').show();
}

function clickAddNew() {
  $('.js-addBookmarkPage').show();
  $('.js-initialPage').hide();
  $('.js-bookmarkList').hide();
}

function clickFilter() {
  $('.js-addBookmarkPage').hide();
  $('.js-initialPage').show();
  $('.js-bookmarkList').show();
}

function clickCancel() {
  $('.js-addBookmarkPage').hide();
  $('.js-initialPage').show();
  $('.js-bookmarkList').show();
}

function clickCreate() {
  $('.js-addBookmarkPage').show();
  $('.js-initialPage').hide();
  $('.js-bookmarkList').hide();
}

function render() {
  renderInitialPage();
  renderAddBookmarkPage();
  renderBookMarksList();
  start();
}
$(render);