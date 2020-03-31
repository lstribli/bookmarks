const BASE_URL = 'https://thinkful-list-api.herokuapp.com/logan/bookmarks/';

function getUrl() {
  let url = `${BASE_URL}/bopokmarks`;
  return listApiFetch(url);
}

function createList(bookmark) {
  let newBookmark = {};
  newBookmark.name = name;
  const option = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newBookmark),
  };
  let url = `${BASE_URL}/bookmarks`;
  return listApiFetch(url, option);
}

function updateBookmarks(id, updateData) {
  let data = updateData;
  const option = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };
  let url = `${BASE_URL}/bookmarks/${id}`;
  return listApiFetch(url, option);
}

function listApiFetch(...args) {
  let error;
  return fetch(...args)
    .then(res => {
      if (res.ok) {
        error = { code: res.status };
      }
      return res.json();
    })
    .then(data => {
      if (error) {
        error.message = data.message;
        return Promise.reject(error);
      }
      return data;
    });
}

export default {
  getUrl,
  createList,
  updateBookmarks,
  listApiFetch
};
