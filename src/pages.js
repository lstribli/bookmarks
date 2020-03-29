import $ from 'jquery';
function InitialPage() {
  return `
  <button class="addNew" type="addNew">Add New</button>
  <button class"filter" type="filter">Filter</button>
  `;
}

function addBookmarkPage() {
  return `
  <form class="addNewBookmark">
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
  <form class="addNewRating">
              <fieldset>
                <ul class="rate-area">
                  <input
                    type="radio"
                    id="5-star"
                    name="rating"
                    value="5"
                  /><label for="5-star" title="Amazing"></label>

                  <input
                    type="radio"
                    id="4-star"
                    name="rating"
                    value="4"
                  /><label for="4-star" title="Good"></label>

                  <input
                    type="radio"
                    id="3-star"
                    name="rating"
                    value="3"
                  /><label for="3-star" title="Average"></label>

                  <input
                    type="radio"
                    id="2-star"
                    name="rating"
                    value="2"
                  /><label for="2-star" title="Not Good"></label>

                  <input
                    type="radio"
                    id="1-star"
                    name="rating"
                    value="1"
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
    <button class= type="cancel">cancel</button>
    <button class= type="submit">create</button>
  </div>
</form>
`;
}

function bookMarksList() {
  return `<div class="js-bookmarkList">
  <ul class="bookmark-list js-bookmark-list"></ul>
</div>`;
}
function renderInitialPage() {
  const showInitialPage = InitialPage();
  $('.initialPageButtons').html(showInitialPage);
}
function renderAddBookmarkPage() {
  const showBookmarkPage = addBookmarkPage();
  $('.js-addBookmarkPage').html(showBookmarkPage);
}
function renderBookMarksList() {
  const showBookmarksList = bookMarksList();
  $('js-bookmarkList').html(showBookmarksList);
}

export default {
  renderInitialPage,
  renderAddBookmarkPage,
  renderBookMarksList
};