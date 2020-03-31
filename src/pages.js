import $ from 'jquery';
import STORE from './store';

//Generate the HTML strings
function initialPage() {
  return `
  <div class="startButtons"></div>
  <button class="addNew" id="addNew" type="addNew">Add New</button>
<div class="filter-menu">
  <select id="dropdown" name="rating">
      <option disabled value></option>Filter by rating:</option>
      <option value=5>5 stars</option>
      <option value=4>4 stars & above</option>
      <option value=3>3 stars & above</option>
      <option value=2>2 stars & above</option>
      <option value=1>1 star & above</option>
  </select>
</div>
  `;
}
//template generator for add new bookmark and rating forms
function addBookmarkPage() {
  return `
  <form class="js-addNewBookmark">
          <label for="add-new-bookmark">Add a bookmark</label>
          <input
            type="text"
            name="bookmark-entry"
            class="bookmark-entry"
            placeholder="e.g., www.github.com"
          />
          <input
            type="text"
            name="bookmark-title"
            class="bookmark-title"
            placeholder="e.g., my bookmark title"
          />
          <form id="js-addNewRating">
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
                    </form>
        <form>
          <input
            type="text"
            name="bookmark-description"
            class="bookmark-description"
            placeholder="e.g., Add a description (optional)"
          />
          <div class="buttons">
            <button class="cancel" id="cancel" type="cancel">cancel</button>
            <button class="create" id="create" type="submit">create</button>
          </div>
        </form>
`;
}
//template generator for list of bookmarks
function bookMarksList() {
  return `
  <ul class="bookmark-list js-bookmark-list">
  <li>guaysighuiilrgnbaiu</li>
</ul>
`;
}

//render the HTML strings
function renderInitialPage() {
  const showInitialPage = initialPage();
  $('#initialPageButtons').html(showInitialPage);
}
function renderAddBookmarkPage() {
  const showBookmarkPage = addBookmarkPage();
  $('#js-addBookmarkPage').html(showBookmarkPage);
}
function renderBookMarksList() {
  const showBookmarksList = bookMarksList();
  $('#js-bookmarkList').html(showBookmarksList);
}

function handleErrorMessage() {
  $('#js-error').html(`returned an error ${STORE.error}`)
}

function render() {
  if (STORE.error !== null) {
    handleErrorMessage();
  }
  if (STORE.adding === true) {
    renderAddBookmarkPage();
  }
  else renderBookMarksList();
}

//export the HTML modules for use by JS
export default {
  render
};