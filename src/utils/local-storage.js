/**
 * @function - Сохраняет текущее состояние игрового поля в локальное хранилище браузера.
 * @param {string} id - Уникальный идентификатор игрового поля. Если не передан, выводит ошибку в консоль.
 * @param {Object} board - Объект, представляющий текущее состояние игрового поля. Если не передан, выводит ошибку в консоль.
**/
function saveBoardToLocalStorage(id, board) {
    if (!id) {
        console.error('saveBoardToLocalStorage: no id provided');
        return;
    }
    if (!board) {
        console.error('saveBoardToLocalStorage: no board provided');
        return;
    }    
    localStorage.setItem('crosswBoard' + id, JSON.stringify(board));
}

/**
 * @function - Загружает сохранённое состояние игрового поля из локального хранилища браузера.
 * @param {string} id - Уникальный идентификатор игрового поля, которое нужно загрузить.
 * @returns {Object|null} Объект с состоянием игрового поля, если он найден в localStorage. 
**/
function loadBoardFromLocalStorage(id) {
  const board = localStorage.getItem('crosswBoard' + id);
  return board ? JSON.parse(board) : null;
}

/**
 * @function - Удаляет сохранённое состояние игрового поля из локального хранилища браузера.
 * @param {string} id - Уникальный идентификатор игрового поля, которое нужно удалить.
**/
function clearBoardInLocalStorage(id) {
    console.log('clearBoardInLocalStorage: id: ' + id);
    localStorage.removeItem('crosswBoard' + id);
}

/**
 * @function - Сохраняет задачу в локальное хранилище браузера.
 * @param {string} id - Уникальный идентификатор задачи. Если не передан, выводит ошибку в консоль.
 * @param {Object} task - Объект задачи для сохранения. Если не передан, выводит ошибку в консоль.
**/
function saveTaskToLocalStorage(id, task) {
    if (!id) {
        console.error('saveTaskToLocalStorage: no id provided');
        return;
    }
    if (!task) {
        console.error('saveTaskToLocalStorage: no task provided');
        return;
    }    
    localStorage.setItem('crosswTask' + id, JSON.stringify(task));
}

/**
 * @function - Загружает сохранённую задачу из локального хранилища браузера
 * @param {string} id - Уникальный идентификатор задачи для загрузки. 
 * @returns {Object|null} Объект задачи, если найден в localStorage, иначе null.
**/
function loadTaskFromLocalStorage(id) {
  const task = localStorage.getItem('crosswTask' + id);
  return task ? JSON.parse(task) : null;
}

/**
 * @function - Удаляет сохранённую задачу из локального хранилища браузера
 * @param {string} id - Уникальный идентификатор задачи для удаления. Если не передан, выводит ошибку в консоль.
**/
function clearTaskInLocalStorage(id) {
  console.log('clearTaskInLocalStorage: id: ' + id);
  localStorage.removeItem('crosswTask' + id);
}

/**
 * @function - Сохраняет все задачи в локальное хранилище браузера
 * @param {Object} board - Объект, содержащий все задачи для сохранения
**/
function saveTasksToLocalStorage(board) {
  localStorage.setItem('crosswTasks', JSON.stringify(board));
}

/**
 * @function - Загружает все сохранённые задачи из локального хранилища
 * @returns {Object|null} Объект со всеми задачами или null, если данные не найдены
**/
function loadTasksFromLocalStorage() {
  const board = localStorage.getItem('crosswTasks');
  return board ? JSON.parse(board) : null;
}

/**
 * @function - Полностью очищает все сохранённые задачи из локального хранилища
**/
function clearTasksInLocalStorage() {
  console.log('clearTasks');
  localStorage.removeItem('crosswTasks');
}

export {  saveBoardToLocalStorage,
          loadBoardFromLocalStorage,
          clearBoardInLocalStorage,
          saveTaskToLocalStorage,
          loadTaskFromLocalStorage,
          clearTaskInLocalStorage,
          saveTasksToLocalStorage,
          loadTasksFromLocalStorage,
          clearTasksInLocalStorage
        }