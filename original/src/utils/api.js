export const API = 'http://crossw.ru/task.php?task=1';


const checkFetchResponse = (res) => {
  return res.ok 
    ? res.json()
    : Promise.reject(`Ошибка Fetch: ${res.status}`);
};

const checkSuccess = (data) => {
  return data && data.success 
  ? data
  : Promise.reject(`Ошибка: Fetch не success: ${data}`);
};

const request = (endpoint, options) => {
  console.log('request: ', `${API}${endpoint}`);
  return fetch(`${API}${endpoint}`, options)
    .then(checkFetchResponse)
    .then(checkSuccess);
};

export {
  request
}