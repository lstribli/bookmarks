const BASE_URL = 'https://thinkful-list-api.herokuapp.com/logan/bookmarks';



function getUrl() {
  let url = `${BASE_URL}`;
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

const listApiFetch = function (...args) {
  // setup var in scope outside of promise chain
  let error;
  return fetch(...args)
    .then(res => {
      if (!res.ok) {
        // if response is not 2xx, start building error object
        error = { code: res.status };
        // if response is not JSON type, place statusText in error object and
        // immediately reject promise
        if (!res.headers.get('content-type').includes('json')) {
          error.message = res.statusText;
          return Promise.reject(error);
        }
      }
      // otherwise, return parsed JSON
      return res.json();
    })
    .then(data => {
      // if error exists, place the JSON message into the error object and 
      // reject the Promise with your error object so it lands in the next 
      // catch.  IMPORTANT: Check how the API sends errors -- not all APIs
      // will respond with a JSON object containing message key
      if (error) {
        error.message = data.message;
        return Promise.reject(error);
      }
      // otherwise, return the json as normal resolved Promise
      return data;
    });
};

export default {
  getUrl,
  createList,
  updateBookmarks,
  listApiFetch
};
