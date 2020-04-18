import $ from 'jquery';
import pages from './pages';
import api from './api';
import STORE from './store';
import renderAddBookmarkPage from './pages';
//when add new is clicked, show the add bookmark page

function addNewOnClick() {
  $('#addNew').click(() => {
    STORE.adding = !STORE.adding;
    console.log('adding');
    // debugger;
    // renderAddBookmarkPage();
    render();
  });

}

const handleBookmarkCancel = function () {
  $('main').on('click', '#cancel', function (event) {
    event.preventDefault();
    STORE.adding = !STORE.adding;
    console.log('cancelled');
    $('#formAddBookmarkForm').empty();
    render();
  });
};


// dropdown menu function code
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
      ${bookmarkTitle},${bookmarks.url},${bookmarks.desc},${bookmarks.rating}
      <div class="bookmark-item-controls">
        <button class="bookmark-item-delete" id="js-item-delete">
          <span class="button-label">delete</span>
        </button>
      </div>
    </li>`;
};

const deleteListItem = function (id) {
  const index = STORE.bookmarks.findIndex(bookmarks => bookmarks.id === id);
  STORE.bookmarks.splice(index, 1);
};
const handleDeleteBookmarkClicked = function () {
  $('.js-bookmark-list').on('click', '.js-item-delete', event => {
    const id = getItemIdFromElement(event.currentTarget);
    api.updateItem(id, STORE)
      .then(response => response.json());
    console.log('delete')
      .then(() => {
        STORE.findAndUpdate(id, { STORE: [''] });
        render();
      }
      );
  });
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
    api.createBookmark(newBookmark)
      .then((newBookmark) => {
        STORE.adding = false;
        STORE.addBookmark(newBookmark);
        render();
      });
  });
};

// const handleItemCheckClicked = function () {
//   $('.js-shopping-list').on('click', '.js-item-toggle', event => {
//     const id = getItemIdFromElement(event.currentTarget);
//     const bookmark = STORE.findById(id);
//     api.updateItem(id, { checked: !bookmark.checked })
//       .then(response => response.json()
//         .then(() => {
//           STORE.findAndUpdate(id, { checked: !bookmark.checked });
//           render();
//         })
//         .catch((error) => {
//           ('something went wrong', error);
//         }));
//   });
// };
const getItemIdFromElement = function (bookmark) {
  return $(bookmark)
    .data('bookmark-id');
};



// const handleToggleFilterClick = function () {
//   $('.js-filter-checked').click(() => {
//     STORE.toggleCheckedFilter();
//     render();
//   });
// };

const handleEditBookmarkSubmit = function () {
  $('.js-bookmarkList').on('submit', event => {
    event.preventDefault();
    const id = getItemIdFromElement(event.currentTarget);
    const bookmarkName = $(event.currentTarget)
      .val();
    STORE.findAndUpdateName(id, bookmarkName);
    STORE.findAndUpdate(id, bookmarkName);
    api.updateItem(id, { bookmarkName })
      .then(response => response.json())
      .then(bookmarkName => {
        STORE.findAndUpdate(id, { bookmarkName });
        render();
      });
    render();
  });
};

const bindEventListeners = function () {
  handleEditBookmarkSubmit();
  // handleToggleFilterClick();
  deleteListItem();
  handleDeleteBookmarkClicked();
  // handleItemCheckClicked();
  handleNewBookmarkSubmit();
  handleBookmarkCancel();
  addNewOnClick();
  // cancelOnClick();
  dropDown();
  console.log('bindEventListeners: firing');
  generateBookmarksString();
};

export default {
  render,
  bindEventListeners
};