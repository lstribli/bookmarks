import $ from 'jquery';
import pages from './pages';
import api from './api';
import STORE from './store';
// import renderAddBookmarkPage from './pages';
//when add new is clicked, show the add bookmark page

function addNewOnClick() {
  $('body').on('click', '#addNew', function (e) {
    e.preventDefault();
    STORE.adding = true;
    render();
  });
}
const handleBookmarkCancel = function () {
  $('main').on('click', '#cancel', function (event) {
    event.preventDefault();
    STORE.adding = false;
    $('.bookmarkform').empty();
    render();
  });
};

function dropDown() {
  $('.filter-menu').on('click', '#dropdown', event => {
    event.preventDefault();
    let value = $('#dropdown').val();
    if (value === 1) {
      value = 1;
    }
    if (value === 2) {
      value = 2;
    }
    if (value === 3) {
      value = 3;
    }
    if (value === 4) {
      value = 4;
    }
    if (value === 5) {
      value = 5;
    }
    $('#dropdown').val();
    console.log(value);
    render();
  });
}
const handleNewBookmarkSubmit = function () {
  $('main').on('submit', 'form#js-addNewBookmark', function (event) {
    event.preventDefault();
    const newBookmark = {
      title: event.target.bookmarkTitle.value,
      url: event.target.bookmarkEntry.value,
      desc: event.target.bookmarkDescription.value,
      rating: parseInt(event.target.rating.value, 10)
    };
    api.createBookmark(newBookmark)
      .then((newBookmark) => {
        STORE.adding = false;
        STORE.addBookmark(newBookmark);
        render();
      });
  });
};

const getItemIdFromElement = function (bookmark) {
  return $(bookmark)
    .data('bookmark-id');
};

function generateBookmarkElement(bookmarks) {
  if (STORE.hideDescription === true) {
    return `
    <li class="js-bookmark-element">
      ${bookmarks.title}
      ${bookmarks.rating}
      <div class="bookmark-item-controls">
        <button class="expand">
        <span class="button-label">Expand</span>
      </button>
      </div>
    </li>`;
  }
  if (STORE.hideDescription === false) {
    return `
    <li class="js-bookmark-element">
    <li>${bookmarks.id}</li>
    <li>${bookmarks.title}</li>
    <li>${bookmarks.url}</li>
    <li>${bookmarks.desc}</li>
    <li>${bookmarks.rating}</li>
      <div class="bookmark-item-controls">
        <button class="button" id="delete">
          <span class="button-label">Delete</span>
        </button>
        <button class="expand">
        <span class="button-label">Compress</span>
      </button>
      <button class="edit">
      <span class="button-label">Edit</span>
    </button>
      </div>
    </li>`;
  }
  if (STORE.hideDescription === null) {
    return `
    <h2>Edit Bookmark</h2>
    <form id="js-editBookmark">
          <label for="add-new-bookmark">Add a bookmark</label>
          <input
            type="text"
            name="bookmarkEntry"
            class="bookmark-entry"
            placeholder="e.g., www.github.com"
          />
          <input
            type="text"
            name="bookmarkTitle"
            class="bookmark-title"
            placeholder="e.g., my bookmark title"
          />
                      <fieldset>
                        <ul class="rate-area">
                          <input
                            type="radio"id="5-star"name="rating"value="5"
                          /><label for="5-star" title="Amazing"></label>
        
                          <input
                            type="radio"id="4-star"name="rating"value="4"
                          /><label for="4-star" title="Good"></label>
        
                          <input
                            type="radio" id="3-star" name="rating" value="3"
                          /><label for="3-star" title="Average"></label>
        
                          <input
                            type="radio" id="2-star" name="rating" value="2"
                          /><label for="2-star" title="Not Good"></label>
        
                          <input type="radio" id="1-star" name="rating" value="1"
                          /><label for="1-star" title="Bad"></label>
                        </ul>
                      </fieldset>
          <input
            type="text"
            name="bookmarkDescription"
            class="bookmark-description"
            placeholder="e.g., Add a description (optional)"
          />
          <div class="buttons">
            <button class="button" id="submit" type="submit">Submit Changes</button>
          </div>
        </form>
        <div class="buttons">
            <button class="button" id="can" type="submit">Cancel</button>
            </div>`;
  }
}


const handleExpand = function () {
  $('.js-bookmarkList').on('click', '.expand', event => {
    event.preventDefault();
    STORE.hideDescription = !STORE.hideDescription;
    render();
  });
};
const handleEdit = function () {
  $('.js-bookmarkList').on('click', '.edit', event => {
    event.preventDefault();
    STORE.hideDescription = null;
    render();
  });
};
const handleEditCancel = function () {
  $('.js-bookmarkList').on('click', '.can', event => {
    event.preventDefault();
    STORE.hideDescription = true;
    render();
  });
};

function handleDeleteBookmarkClicked() {
  $('.js-bookmarkList').on('click', '#delete', event => {
    event.preventDefault();
    const id = getItemIdFromElement(event.currentTarget);
    api.deleteBookmarks(id, STORE)
      .then(response => response.json())
      .then(() => {
        STORE.findAndUpdate(id, { STORE: [''] });
        render();
      }
      );
  });
}

const generateBookmarksString = function (bookmarksList) {
  const bookmarks = bookmarksList.map(bookmarks => generateBookmarkElement(bookmarks));
  return bookmarks.join('');
};

let render = function () {
  let bookmarks = [...STORE.bookmarks];
  if (STORE.adding === true) {
    $('.bookmarkform').html(pages.addBookmarkPage());
  }
  if (STORE.adding === false) {
    $('.bookmarkform').empty();
  }
  $('#js-bookmarkList').html(generateBookmarksString(bookmarks));
  generateBookmarkElement();
};

const bindEventListeners = function () {
  handleDeleteBookmarkClicked();
  handleNewBookmarkSubmit();
  handleBookmarkCancel();
  addNewOnClick();
  dropDown();
  handleExpand();
  handleEdit();
  handleEditCancel();
};

export default {
  render,
  bindEventListeners
};