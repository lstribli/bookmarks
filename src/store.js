
const bookmarks = [];
let hideDescription = true;
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

function findAndUpdateBookmarks(id, newData) {
  let oldData = this.findById(id);
  Object.assign(oldData, newData);
}

export default {
  bookmarks,
  adding,
  error,
  hideDescription,
  filter,
  findById,
  addBookmark,
  findAndUpdateBookmarks,
};