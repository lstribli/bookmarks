import $ from 'jquery';
import api from './api';
import store from './store';
import events from './events';
import pages from './pages';
import './index.css';

console.log('main.js');
const main = function () {
  api.getUrl()
    .then(res => {
      if (res.ok) {
        return res.json();
      }
    })
    .then((bookmarks) => {
      bookmarks.forEach((bookmark) => store.addBookmark(bookmark));
      events.render();
    });
  events.bindEventListeners();
  console.log('index.js: main: firing');
};

$(main);
