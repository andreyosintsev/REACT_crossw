import IBoardElement from "../../components/game/board-element/board-element.interface";

import { ICrossword } from "../../store/storeUser/storeUser.interface";
import { ITask } from "../api/api.interface";
import { BOARD_PREFIX, TASK_PREFIX, TASKS_KEY, CROSSWORD_PREFIX } from "./local-storage.constants";

/** Сохраняет игровое поле в localStorage
 * @param boardId идентификатор поля
 * @param board данные игрового поля
 */
export const saveBoardToLocalStorage = (boardId: number, board: IBoardElement[]): void => {
    localStorage.setItem(`${BOARD_PREFIX}${boardId}`, JSON.stringify(board));
};

/** Загружает игровое поле из localStorage
 * @param boardId идентификатор поля
 * @returns загруженное поле или null если не найдено
 */
export const loadBoardFromLocalStorage = (boardId: number): IBoardElement[] | null => {
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
 * @param tasks массив заданий
 */
export const saveTasksToLocalStorage = (tasks: ITask[]): void => {
    localStorage.setItem(`${TASKS_KEY}`, JSON.stringify(tasks));
};

/**
 * @function Сохраняет состояние кроссворда в локальное хранилище
 * @param {number} id - Уникальный идентификатор кроссворда
 * @param {ICrossword} crossword - Объект с данными кроссворда для сохранения
 */
export const saveCrosswordToLocalStorage = (id: number, crossword: ICrossword): void => {
    const serializedData = JSON.stringify(crossword);
    localStorage.setItem(`${CROSSWORD_PREFIX}${id}`, serializedData);
};

/**
 * @function Загружает состояние кроссворда из локального хранилища
 * @param {number} id - Уникальный идентификатор кроссворда
 * @returns {ICrossword | null} Объект с данными кроссворда или null если не найден
 */
export const loadCrosswordFromLocalStorage = (id: number): ICrossword | null => {
    const serializedData = localStorage.getItem(`${CROSSWORD_PREFIX}${id}`);
    return serializedData ? JSON.parse(serializedData) : null;
};

/**
 * @function Обновляет состояние кроссворда в локальном хранилище
 * @param {number} id - Уникальный идентификатор кроссворда
 * @param {ICrossword} crossword - Обновленный объект с данными кроссворда
 * @returns {void}
 */
export const updateCrosswordBoardFromLocalStorage = (id: number, crossword: ICrossword): void => {
    localStorage.setItem(`${CROSSWORD_PREFIX}${id}`, JSON.stringify(crossword));
};

/**
 * @function Удаляет состояние кроссворда из локального хранилища
 * @param {number} id - Уникальный идентификатор кроссворда
 * @returns {void}
 */
export const clearCrosswordInLocalStorage = (id: number): void => {
    localStorage.removeItem(`${CROSSWORD_PREFIX}${id}`);
};
