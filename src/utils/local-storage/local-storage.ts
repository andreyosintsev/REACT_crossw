import IBoardElement from "../../pages/game/board-element/board-element.interface";
import { ITask } from "../api/api.interface";
import {
    BOARD_PREFIX,
    TASK_PREFIX,
    TASKS_KEY,
} from "./local-storage.constants";

/** Сохраняет игровое поле в localStorage
 * @param boardId идентификатор поля
 * @param board данные игрового поля
 */
export const saveBoardToLocalStorage = (
    boardId: number,
    board: IBoardElement[]
): void => {
    localStorage.setItem(`${BOARD_PREFIX}${boardId}`, JSON.stringify(board));
};

/** Загружает игровое поле из localStorage
 * @param boardId идентификатор поля
 * @returns загруженное поле или null если не найдено
 */
export const loadBoardFromLocalStorage = (
    boardId: number
): IBoardElement[] | null => {
    const board = localStorage.getItem(`${BOARD_PREFIX}${boardId}`);
    return board ? JSON.parse(board) : null;
};

/** Очищает игровое поле в localStorage
 * @param boardId идентификатор поля
 */
export const clearBoardInLocalStorage = (boardId: number): void => {
    localStorage.removeItem(`${BOARD_PREFIX}${boardId}`);
};

/** Сохраняет задание в localStorage
 * @param id идентификатор задания
 * @param task данные задания
 */
export const saveTaskToLocalStorage = (taskId: number, task: ITask): void => {
    localStorage.setItem(`${TASK_PREFIX}${taskId}`, JSON.stringify(task));
};

/** Загружает задание из localStorage
 * @param id идентификатор задания
 * @returns загруженное задание или null если не найдено
 */
export const loadTaskFromLocalStorage = (taskId: number): ITask | null => {
    const task = localStorage.getItem(`${TASK_PREFIX}${taskId}`);
    return task ? JSON.parse(task) : null;
};

/** Удаляет задание из localStorage
 * @param taskId идентификатор задания
 */
export const clearTaskInLocalStorage = (taskId: number): void => {
    localStorage.removeItem(`${TASK_PREFIX}${taskId}`);
};

/** Сохраняет список заданий в localStorage
 * @param board массив заданий
 */
export const saveTasksToLocalStorage = (board: ITask[]): void => {
    localStorage.setItem(`${TASKS_KEY}`, JSON.stringify(board));
};
