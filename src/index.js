import $ from 'jquery';
import api from './api';
import pages from './pages';
import store from './store';
import events from './events';

import "index.css";

const main = function () {
  api.getUrl()
    .then(res => res.json())
    .then((bookmarks) => {
      bookmarks.foreach((bookmark) => store.addBookmark(bookmark));
      bookmarksList.render();
    });

  bookmarkList.bindEventListeners();
  bookmarkList.render();

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