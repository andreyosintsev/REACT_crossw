import IBoardElement from "../../pages/game/board-element/board-element.interface";
import { ICrosswBoard } from "../../services/userStoreTask/userStore.interface";
import { ITask } from "../api/api.interface";
import {
    BOARD_PREFIX,
    TASK_PREFIX,
    TASKS_KEY,
    USER_BOARD_PREFIX,
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

/**
 * @function Сохраняет состояние доски кроссворда в локальное хранилище
 * @param {number} id - Уникальный идентификатор кроссворда
 * @param {ICrosswBoard} data - Объект с данными доски для сохранения
 */
export const saveCrosswordBoardToLocalStorage = (
    id: number,
    data: ICrosswBoard
): void => {
    const serializedData = JSON.stringify(data);
    localStorage.setItem(`${USER_BOARD_PREFIX}${id}`, serializedData);
};

/**
 * @function Загружает состояние доски кроссворда из локального хранилища
 * @param {number} id - Уникальный идентификатор кроссворда
 * @returns {ICrosswBoard | null} Объект с данными доски или null если не найден
 */
export const loadCrosswordBoardFromLocalStorage = (
    id: number
): ICrosswBoard | null => {
    const serializedData = localStorage.getItem(`${USER_BOARD_PREFIX}${id}`);
    return serializedData ? JSON.parse(serializedData) : null;
};

/**
 * @function Обновляет состояние доски кроссворда в локальном хранилище
 * @param {number} id - Уникальный идентификатор кроссворда
 * @param {ICrosswBoard} task - Обновленный объект с данными доски
 * @returns {void}
 */
export const updateCrosswordBoardFromLocalStorage = (
    id: number,
    task: ICrosswBoard
): void => {
    localStorage.setItem(`${USER_BOARD_PREFIX}${id}`, JSON.stringify(task));
};

/**
 * @function Удаляет состояние доски кроссворда из локального хранилища
 * @param {number} id - Уникальный идентификатор кроссворда
 * @returns {void}
 */
export const clearCrossBoardsInLocalStorage = (id: number): void => {
    localStorage.removeItem(`${USER_BOARD_PREFIX}${id}`);
};
