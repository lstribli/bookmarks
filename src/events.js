import $ from 'jquery';
import pages from "./pages";
import api from "./api";
import STORE from './store';
//when add new is clicked, show the add bookmark page

function addNewOnClick() {
  $('#addNew').click(() => {
    STORE.adding = !STORE.adding;
    render();

  });
}


//dropdown menu function code
function dropDown() {
  $('.filter-menu').on('click', '#dropdown', event => {
    event.preventDefault();
    console.log('dropdown menu option clicked!');

    let value = $(this).val();
    if (value === 1) {
      const bookmarks = STORE.list.filter(bookmarks => bookmarks.rating >= 1);
      return bookmarks;
    }
    render();
  });
}

const generateBookmarkElement = function (bookmarks) {
  let bookmarkTitle = `<span class="bookmark-item bookmark-item__checked">${bookmarks.title}</span>`;
  if (!bookmarks.expanded) {
    bookmarkTitle = `
      <form class="js-edit-bookmark">
        <input class="bookmark-item" type="text" value="${bookmarks.title}" />
      </form>
    `;
  }

  return `
    <li class="js-bookmark-element" data-bookmark-id="${bookmarks.id}">
      ${bookmarkTitle}
      <div class="bookmark-item-controls">
        <button class="bookmark-item-toggle js-item-toggle">
          <span class="button-label">check</span>
        </button>
        <button class="bookmark-item-delete js-item-delete">
          <span class="button-label">delete</span>
        </button>
      </div>
    </li>`;
};
const generateBookmarksString = function (bookmarksList) {
  const bookmarks = bookmarksList.map(bookmarks => generateBookmarkElement(bookmarks));
  return bookmarks.join('');
};

const render = function () {
  let bookmarks = [...STORE.bookmarks];
  if (STORE.adding === true) {
    $('#formAddBookmarkForm').html(pages.addBookmarkPage());
  }
  else {
    $('#js-bookmarkList').html(generateBookmarksString(bookmarks));
  }
  // const bookmarksListString = renderAddBookmarksPage(bookmarks);
  // $(".js-bookmarkList").html(bookmarksListString);
};

const handleNewBookmarkSubmit = function () {
  $('main').on('submit', 'form#js-addNewBookmark', function (event) {
    event.preventDefault();
    const newBookmark = {
      title: event.target.bookmarkTitle.value,
      url: event.target.bookmarkEntry.value,
      desc: event.target.bookmarkDescription.value,
      rating: parseInt(event.target.rating.value, 10)
    };
    console.log(newBookmark);
    api.createBookmark(newBookmark)
      .then((newBookmark) => {
        STORE.adding = false;
        STORE.addBookmark(newBookmark);
        render();
      });
  });
};

const handleItemCheckClicked = function () {
  $(".js-shopping-list").on("click", ".js-item-toggle", event => {
    const id = getItemIdFromElement(event.currentTarget);
    const bookmark = store.findById(id);
    api.updateItem(id, { checked: !bookmark.checked })
      .then(response => response.json()
        .then(() => {
          STORE.findAndUpdate(id, { checked: !bookmark.checked });
          render();
        })
        .catch((error) => {
          console.log('something went wrong', error)
        }));
  });
};
const getItemIdFromElement = function (bookmark) {
  return $(bookmark)
    .closest('.js-item-element')
    .data('item-id');
};

const handleDeleteBookmarkClicked = function () {
  $('.js-shopping-list').on('click', '.js-item-delete', event => {
    const id = getItemIdFromElement(event.currentTarget);
    api.updateItem(id, item)
      .then(response => response.json())
      .then(() => {
        STORE.findAndUpdate(id, { item: [''] });
        render();
      }
      );
  });
};

const handleToggleFilterClick = function () {
  $('.js-filter-checked').click(() => {
    STORE.toggleCheckedFilter();
    render();
  });
};

const handleEditBookmarkSubmit = function () {
  $('.js-shopping-list').on('submit', '.js-edit-item', event => {
    event.preventDefault();
    const id = getItemIdFromElement(event.currentTarget);
    const bookmarkName = $(event.currentTarget)
      .find('.shopping-item')
      .val();
    STORE.findAndUpdateName(id, bookmarkName);
    STORE.findAndUpdate(id, bookmarkName);
    api.updateItem(id, { bookmarkName })
      .then(response => response.json())
      .then(bookmarkName => {
        store.findAndUpdate(id, { bookmarkName });
        render();
      });
    render();
  });
};

const bindEventListeners = function () {
  handleEditBookmarkSubmit();
  handleToggleFilterClick();
  handleDeleteBookmarkClicked();
  handleItemCheckClicked();
  handleNewBookmarkSubmit();
  addNewOnClick();
  // generateBookmarksString();
};

export default {
  render,
  bindEventListeners
}