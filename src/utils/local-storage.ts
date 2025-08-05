import { IBoard, ITask } from "./local-storage.interface";

/**
 * Класс для работы с localStorage приложения кроссвордов
 * Предоставляет методы для сохранения/загрузки данных кроссвордов
 */
export class LocalStorage {
  // Префиксы ключей для различных типов данных
  private readonly BOARD_PREFIX = 'crosswBoard';  // Префикс для хранения игрового поля
  private readonly TASK_PREFIX = 'crosswTask';    // Префикс для хранения заданий
  private readonly TASKS_KEY = 'crosswTasks';     // Ключ для хранения всех заданий

  /** Сохраняет игровое поле в localStorage
   * @param id идентификатор поля
   * @param board данные игрового поля
   */
  saveBoardToLocalStorage(id: number, board: IBoard[]) {
    localStorage.setItem(`${this.BOARD_PREFIX}` + id, JSON.stringify(board));
  }

  /** Загружает игровое поле из localStorage
   * @param id идентификатор поля
   * @returns загруженное поле или null если не найдено
   */
  loadBoardFromLocalStorage(id: number) {
    const board = localStorage.getItem(`${this.BOARD_PREFIX}` + id);
    return board ? JSON.parse(board) : null;
  }

  /** Очищаем игровое поле в localStorage
   * @param id идентификатор поля
   */
  clearBoardInLocalStorage(id: number) {
    console.log('clearBoardInLocalStorage: id: ' + id);
    localStorage.removeItem(`${this.BOARD_PREFIX}` + id);
  }

  /** Сохраняет задание в localStorage
   * @param id идентификатор задания
   * @param task данные задания
   */
  saveTaskToLocalStorage(id: number, task: ITask) {
    localStorage.setItem(`${this.TASK_PREFIX}` + id, JSON.stringify(task));
  }

  /** Загружает задание из localStorage
   * @param id идентификатор задания
   * @returns загруженное задание или null если не найдено
   */
  loadTaskFromLocalStorage(id: number) {
    const task = localStorage.getItem(`${this.TASK_PREFIX}` + id);
    return task ? JSON.parse(task) : null;
  }

  /** Удаляет задание из localStorage
   * @param id идентификатор задания
   */
  clearTaskInLocalStorage(id: number) {
    console.log('clearTaskInLocalStorage: id: ' + id);
    localStorage.removeItem(`${this.TASK_PREFIX}` + id);
  }

  /** Сохраняет список заданий в localStorage
   * @param board массив заданий
   */
  saveTasksToLocalStorage(board: IBoard[]) {
    localStorage.setItem(`${this.TASKS_KEY}`, JSON.stringify(board));
  }
}