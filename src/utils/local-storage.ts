/**
 * Класс для работы с localStorage приложения кроссвордов
 * Предоставляет методы для сохранения/загрузки данных кроссвордов
 */
export class LocalStorage {
  private readonly BOARD_PREFIX = 'crosswBoard';
  private readonly TASK_PREFIX = 'crosswTask';
  private readonly TASKS_KEY = 'crosswTasks';

  saveBoardToLocalStorage(id: number, board: IBoard[]) {
    // if (!id) {
    //   console.error('saveBoardToLocalStorage: no id provided');
    //   return;
    // }
    // if (!board) {
    //   console.error('saveBoardToLocalStorage: no board provided');
    //   return;
    // } @tudo: Удалить, поскольку в этой проверке теперь нет смысла.
    localStorage.setItem(`${this.BOARD_PREFIX}` + id, JSON.stringify(board));
  }

  loadBoardFromLocalStorage(id: number) {
    const board = localStorage.getItem(`${this.BOARD_PREFIX}` + id);
    return board ? JSON.parse(board) : null;
  }

  clearBoardInLocalStorage(id: number) {
    console.log('clearBoardInLocalStorage: id: ' + id);
    localStorage.removeItem(`${this.BOARD_PREFIX}` + id);
  }

  saveTaskToLocalStorage(id: number, task: ITask) {
    // if (!id) {
    //   console.error('saveTaskToLocalStorage: no id provided');
    //   return;
    // }
    // if (!task) {
    //   console.error('saveTaskToLocalStorage: no task provided');
    //   return;
    // }  @tudo: Удалить, поскольку в этой проверке теперь нет смысла.
    localStorage.setItem(`${this.TASK_PREFIX}` + id, JSON.stringify(task));
  }

  loadTaskFromLocalStorage(id: number) {
    const task = localStorage.getItem(`${this.TASK_PREFIX}` + id);
    return task ? JSON.parse(task) : null;
  }

  clearTaskInLocalStorage(id: number) {
    console.log('clearTaskInLocalStorage: id: ' + id);
    localStorage.removeItem(`${this.TASK_PREFIX}` + id);
  }

  saveTasksToLocalStorage(board: IBoard[]) {
    localStorage.setItem(`${this.TASKS_KEY}`, JSON.stringify(board));
  }

  // loadTasksFromLocalStorage() {
  //   const board = localStorage.getItem(`${this.TASKS_KEY}`);
  //   return board ? JSON.parse(board) : null;
  // } @tudo: не используется

  // clearTasksInLocalStorage() {
  //   console.log('clearTasks');
  //   localStorage.removeItem(`${this.TASKS_KEY}`);
  // } @tudo: не используется
}

interface IBoard {
  "xCoord": number;
  "yCoord": number;
  "content": string;
}

interface ITask {
    "id": string,
    "name": string,
    "task": string[],
    "width": string,
    "height": string,
    "image_preview": string,
    "image_solved": string,
    "success": string,
}