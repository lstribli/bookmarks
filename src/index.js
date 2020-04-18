import $ from 'jquery';
import api from './api';
import store from './store';
import events from './events';
import pages from './pages';
import './index.css';

console.log('main.js');
const main = function () {
  api.getUrl()
    .then(res => res.json())
    .then((bookmarks) => {
      bookmarks.forEach((bookmark) => store.addBookmark(bookmark));
      events.render();
    });
  events.bindEventListeners();
  console.log('index.js: main: firing');
};

$(main);



//DEFINE PAGES
//DEFINE API
//DEFINE LOCAL STORE

//make the add new button open the new bookmark page
//make each field in the form push values to keys in an object
//bookmark address will return a link 
//title returns the name as a string
//stars will log a value and feed into the sort by function
//description returns a string that is hideable on click
//CREATE will submit the form, creating a new object and its keys, storing the submitted things as values
//PUSH the result to the server with assigned ID
//PULL the the same object down by ID from the server and render it to the page