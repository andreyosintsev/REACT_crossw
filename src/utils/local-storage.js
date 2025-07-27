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

function loadBoardFromLocalStorage(id) {
  const board = localStorage.getItem('crosswBoard' + id);
  return board ? JSON.parse(board) : null;
}

function clearBoardInLocalStorage(id) {
    console.log('clearBoardInLocalStorage: id: ' + id);
    localStorage.removeItem('crosswBoard' + id);
}

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

function loadTaskFromLocalStorage(id) {
  const task = localStorage.getItem('crosswTask' + id);
  return task ? JSON.parse(task) : null;
}

function clearTaskInLocalStorage(id) {
  console.log('clearTaskInLocalStorage: id: ' + id);
  localStorage.removeItem('crosswTask' + id);
}

function saveTasksToLocalStorage(board) {
  localStorage.setItem('crosswTasks', JSON.stringify(board));
}

function loadTasksFromLocalStorage() {
  const board = localStorage.getItem('crosswTasks');
  return board ? JSON.parse(board) : null;
}

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