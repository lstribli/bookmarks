import $ from 'jquery';
import api from './api';
import store from './store';
import events from './events';
import pages from './pages';
import './index.css';
import createBookmarks from './api';

console.log('main.js');
const main = function () {
  events.bindEventListeners();
  console.log('index.js: main: firing');
};

$(main);
