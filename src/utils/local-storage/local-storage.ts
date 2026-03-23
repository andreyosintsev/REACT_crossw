import IBoardElement from "../../pages/game/board-element/board-element.interface";
import { ICrosswBoard } from "../../store/storeUser/storeUser.interface";
import { ITask } from "../api/api.interface";
import {
    BOARD_PREFIX,
    TASK_PREFIX,
    TASKS_KEY,
    USER_BOARD_PREFIX,
} from "./local-storage.constants";

import {
    saveToLocalStorage,
    loadFromLocalStorage,
    removeFromLocalStorage,
} from "./storage-utils";


const key = (prefix: string, id?: number) => (id !== undefined ? `${prefix}${id}` : prefix);

/** Сохраняет игровое поле в localStorage
 * @param boardId идентификатор поля
 * @param board данные игрового поля
 */
export const saveBoardToLocalStorage = (
    boardId: number,
    board: IBoardElement[]
): void => saveToLocalStorage(key(BOARD_PREFIX, boardId), board);


/** Загружает игровое поле из localStorage
 * @param boardId идентификатор поля
 * @returns загруженное поле или null если не найдено
 */
export const loadBoardFromLocalStorage = (
    boardId: number
): IBoardElement[] | null => loadFromLocalStorage(key(BOARD_PREFIX, boardId));

/** Очищает игровое поле в localStorage
 * @param boardId идентификатор поля
 */
export const clearBoardInLocalStorage = (
    boardId: number
): void => removeFromLocalStorage(key(BOARD_PREFIX, boardId));

/** Сохраняет задание в localStorage
 * @param id идентификатор задания
 * @param task данные задания
 */
export const saveTaskToLocalStorage = (
    taskId: number,
    task: ITask
): void => saveToLocalStorage(key(TASK_PREFIX, taskId), task);

/** Загружает задание из localStorage
 * @param id идентификатор задания
 * @returns загруженное задание или null если не найдено
 */
export const loadTaskFromLocalStorage = (
    taskId: number
): ITask | null => loadFromLocalStorage(key(TASK_PREFIX, taskId));

/** Удаляет задание из localStorage
 * @param taskId идентификатор задания
 */
export const clearTaskInLocalStorage = (
    taskId: number
): void => removeFromLocalStorage(key(TASK_PREFIX, taskId));

/** Сохраняет список заданий в localStorage
 * @param board массив заданий
 */
export const saveTasksToLocalStorage = (
    board: ITask[]
): void => saveToLocalStorage(key(TASKS_KEY), board);

/**
 * @function Сохраняет состояние доски кроссворда в локальное хранилище
 * @param {number} id - Уникальный идентификатор кроссворда
 * @param {ICrosswBoard} data - Объект с данными доски для сохранения
 */
export const saveCrosswordBoardToLocalStorage = (
    id: number,
    data: ICrosswBoard
): void => saveToLocalStorage(key(USER_BOARD_PREFIX, id), data);

/**
 * @function Загружает состояние доски кроссворда из локального хранилища
 * @param {number} id - Уникальный идентификатор кроссворда
 * @returns {ICrosswBoard | null} Объект с данными доски или null если не найден
 */
export const loadCrosswordBoardFromLocalStorage = (
    id: number
): ICrosswBoard | null => loadFromLocalStorage(key(USER_BOARD_PREFIX, id));

/**
 * @function Удаляет состояние доски кроссворда из локального хранилища
 * @param {number} id - Уникальный идентификатор кроссворда
 * @returns {void}
 */
export const clearCrossBoardInLocalStorage = (
    id: number
): void => removeFromLocalStorage(key(USER_BOARD_PREFIX, id));
