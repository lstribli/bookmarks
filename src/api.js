import findById from './store';
const BASE_URL = 'https://thinkful-list-api.herokuapp.com/logan/bookmarks';

function getUrl() {
  let url = `${BASE_URL}`;
  return listApiFetch(url);
}

function createBookmark(bookmark) {
  const option = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bookmark),
  };
  let url = `${BASE_URL}`;
  return listApiFetch(url, option);
}

function updateBookmarks(id, updateData) {
  let data = updateData;
  const option = {
    method: 'PATCH',
    body: JSON.stringify(data),
  };
  console.log('updateBookmarks(api):', data);
  let url = `${BASE_URL}/${id}`;
  return listApiFetch(url, option);
}

function deleteBookmarks(id) {
  const option = {
    method: 'DELETE',
  };
  console.log('delete bookmark API:', id);
  let url = `${BASE_URL}/${id}`;
  return listApiFetch(url, option);
}


const listApiFetch = function (...args) {
  let error;
  return fetch(...args)
    .then(res => {
      if (!res.ok) {
        error = { code: res.status };
        if (!res.headers.get('content-type').includes('json')) {
          error.message = res.statusText;
          return Promise.reject(error);
        }
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
};

export default {
  getUrl,
  createBookmark,
  updateBookmarks,
  listApiFetch,
  deleteBookmarks
};
