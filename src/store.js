
const bookmarks = [];
let hideDescription = false;
let adding = false;
let error = null;
let filter = 0;


function findById(id) {
  return this.bookmarks.find(bookmarks => bookmarks.id === id);
}

function addBookmark(bookmarks) {
  this.bookmarks.push(Object.assign(bookmarks, {
    expanded: false
  }));
}

// function togglehideDescriptionFilter() {
//   this.hideDescription = !this.hideDescription;
// }

function findAndUpdateBookmarks(id, newData) {
  let oldData = this.findById(id);
  Object.assign(oldData, newData);
}

export default {
  bookmarks,
  adding,
  error,
  filter,
  hideDescription,
  findById,
  addBookmark,
  // togglehideDescriptionFilter,
  findAndUpdateBookmarks,
};