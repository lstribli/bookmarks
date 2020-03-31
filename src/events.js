$(document).ready(function () {
  //dropdown menu function code
  $('.filter-menu').on('click', '#dropdown', event => {
    event.preventDefault();
    console.log('dropdown menu option clicked!');

    let value = $(this).val();
    if (value === 1) {
      const bookmarks = STORE.list.filter(bookmarks => bookmarks.rating >= 1);
      return bookmarks;
    }
    renderStore();
  });
});
const generateBookmarkElement = function (item) {
  let bookmarkTitle = `<span class="bookmark-item bookmark-item__checked">${bookmarks.name}</span>`;
  if (!bookmarks.checked) {
    bookmarkTitle = `
      <form class="js-edit-bookmark">
        <input class="bookmark-item" type="text" value="${bookmarks.name}" />
      </form>
    `;
  }

  return `
    <li class="js-bookmark-element" data-bookmark-id="${bookmarks.id}">
      ${bookmarksTitle}
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
  const bookmarks = bookmarks.map(bookmarks => generateItemElement(bookmarks));
  return bookmarks.join("");
};

const render = function () {
  let bookmarks = [...store.bookmarks];
  if (store.hideCheckedBookmarks) {
    bookmarks = bookmarks.filter(bookmark => !bookmark.checked);
  }
  const bookmarksListString = renderAddBookmarksPage(bookmarks);
  $(".js-bookmarkList").html(bookmarksListString);
};

const handleNewBookmarkSubmit = function () {
  $("#js-addNewBookmark").submit(function (event) {
    event.preventDefault();
    const newBookmarkName = $(".bookmark-entry").val();
    $(".bookmark-entry").val("");
    api.createBookmark(newBookmarkName)
      .then(results => results.json())
      .then((newBookmark) => {
        store.addItem(newBookmark);
        console.log(newBookmark);
        render();
      });
    console.log(newBookmarkName);
  });
};

const handleItemCheckClicked = function () {
  $(".js-shopping-list").on("click", ".js-item-toggle", event => {
    const id = getItemIdFromElement(event.currentTarget);
    const item = store.findById(id);
    api.updateItem(id, { checked: !item.checked })
      .then(response => response.json()
        .then(() => {
          store.findAndUpdate(id, { checked: !item.checked });
          render();
        })
        .catch((error) => {
          console.log('something went wrong', error)
        }));

    const getItemIdFromElement = function (item) {
      return $(item)
        .closest(".js-item-element")
        .data("item-id");
    };

    const handleDeleteBookmarkClicked = function () {
      $(".js-shopping-list").on("click", ".js-item-delete", event => {
        const id = getItemIdFromElement(event.currentTarget);
        api.updateItem(id, item)
        then(response => response.json())
          .then(() => {
            store.findAndUpdate(id, { item: [''] });
            render();
          }
          );
      });
    };

    const handleToggleFilterClick = function () {
      $(".js-filter-checked").click(() => {
        store.toggleCheckedFilter();
        render();
      });
    };

    const handleEditBookmarkSubmit = function () {
      $(".js-shopping-list").on("submit", ".js-edit-item", event => {
        event.preventDefault();
        const id = getItemIdFromElement(event.currentTarget);
        const itemName = $(event.currentTarget)
          .find(".shopping-item")
          .val();
        store.findAndUpdateName(id, itemName);
        store.findAndUpdate(id, itemName);
        api.updateItem(id, { itemName })
          .then(response => response.json())
          .then(itemName => {
            store.findAndUpdate(id, { itemName });
            render();
          });
        render();
      });
    };

    const bindEventListeners = function () {

    };

    export default {
      render,
      bindEventListeners
    }
  })
};