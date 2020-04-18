import $ from 'jquery';
import STORE from './store';

//Generate the HTML strings
//template generator for add new bookmark and rating forms
function addBookmarkPage() {
  return `
  <form id="js-addNewBookmark">
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
            <button class="create" id="create" type="submit">create</button>
          </div>
        </form>
        <div class="buttons">
            <button class="cancel" id="cancel" type="submit">cancel</button>
            </div>
`;
}
//template generator for list of bookmarks
function bookMarksList() {
  return `
  <ul class="bookmark-list js-bookmark-list">
  <li></li>
</ul>
`;
}

//render the HTML strings

function renderAddBookmarkPage() {
  const showBookmarkPage = addBookmarkPage();
  $('#js-addBookmarkPage').html(showBookmarkPage);
}
function renderBookMarksList() {
  const showBookmarksList = bookMarksList();
  $('#js-bookmarkList').html(showBookmarksList);
}

function handleErrorMessage() {
  $('#js-error').html(`returned an error ${STORE.error}`);
}

//export the HTML modules for use by JS
export default {
  addBookmarkPage,
  bookMarksList,
  renderAddBookmarkPage,
  renderBookMarksList,
  handleErrorMessage
};