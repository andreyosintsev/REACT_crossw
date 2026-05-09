import { create } from "zustand";
import IStoreGame from "./storeGame.interface";
import {
    clearBoardInLocalStorage,
    clearCrosswordInLocalStorage,
    loadBoardFromLocalStorage,
    saveBoardToLocalStorage,
    saveCrosswordToLocalStorage,
} from "../../utils/local-storage/local-storage";

import { createEmptyBoard, generateLegends, getCellIndex, isBoardSolved, cleanBoard, updateBoardCell } from "../../utils/game/game";
import { applyRandomHelp } from "../../utils/game/help";

/**
 * Хранилище Zustand для управления игровым процессом кроссворда
 * @function
 * @returns {IStoreGame} Объект хранилища с полным контролем игры
 *
 * @description
 * Централизованное хранилище для управления всем игровым процессом:
 * - Состояние игры и задачи
 * - Генерация легенд
 * - Обработка пользовательских действий
 * - Проверка победы
 * - Работа с локальным хранилищем
 *
 * @example
 * // Использование в компоненте игры
 * const { task, board, handleBoardClick, initializeGame } = gameStoreControl();
 */
const storeGame = create<IStoreGame>((set, get) => ({
    task: null,
    board: [],
    horizontalLegend: {
        legend: [null],
        width: 0,
        height: 0,
    },
    verticalLegend: {
        legend: [null],
        width: 0,
        height: 0,
    },
    isWin: false, // Победа именно в процессе решения кроссворда
    solved: false, // Флаг разгаданного кроссворда, полученного из локального хранилища
    errorTask: false,

    setError: (state) => set({ errorTask: state }),

    setTask: (task, userTaskInfo) => {
        if (!task) {
            set({ errorTask: true });
            return;
        }

        set({
            task,
            solved: userTaskInfo.solved,
            isWin: false,
            errorTask: false,
        });
    },

    setWin: (status) => set({ isWin: status }),

    initializeGame: () => {
        const { task, createLegends, initBoard } = get();
        if (!task) return;

        createLegends();
        initBoard();
    },

    initBoard: () => {
        const task = get().task;

        if (!task) return;
        // Загружаем сохраненное состояние или создаем пустой массив
        const savedBoard = loadBoardFromLocalStorage(task.id);

        const board = savedBoard && savedBoard.length > 0 ? savedBoard : createEmptyBoard(task);

        set({ board });
        saveBoardToLocalStorage(task.id, board);
    },

    giveHint: () => {
        //Получить текущую задачу
        //Получить текущее состояние поля
        const { task, board } = get();
        if (!task || board.length === 0) return;

        //Получаем новый вариант поля с примененной подсказкой
        const updatedBoard = applyRandomHelp(task, board);

        //Если новый вариант поля - это на самом деле старое поле, выходим
        const hasChanges = updatedBoard !== board;
        if (!hasChanges) return;

        // Устанавливаем состояние и сохраняем в localStorage
        set({ board: updatedBoard });
        saveBoardToLocalStorage(task.id, updatedBoard);
    },

    createLegends: () => {
        const { task } = get();
        if (!task) return;

        set(generateLegends(task));
    },

    //Применяет действие к клетке игрового поля
    applyCellAction: (xCoord, yCoord, action) => {
        const { task, board, checkWin } = get();

        if (!task) return;

        const cellIndex = getCellIndex(xCoord, yCoord, task.width);

        // Создаем копию текущего состояния поля
        const newBoard = updateBoardCell(board, cellIndex, action);

        set({ board: newBoard });

        checkWin(newBoard);
        saveBoardToLocalStorage(task.id, newBoard);
    },

    restartGame: () => {
        const { task, initBoard } = get();
        if (!task) return;

        clearBoardInLocalStorage(task.id);
        clearCrosswordInLocalStorage(task.id);

        initBoard();

        set({
            solved: false,
            isWin: false,
        });
    },

    setGameCompleted: (status) => {
        const { task } = get();

        if (!task) return;

        set({ solved: status });

        saveCrosswordToLocalStorage(task.id, {
            solved: status,
            id: task.id,
            time: "",
            stars: 0,
        });
    },

    checkWin: (board) => {
        const { task, isWin } = get();

        if (!task || isWin || board.length === 0) return false;

        const solved = isBoardSolved(task, board);

        if (!solved) return false;

        const cleanedBoard = cleanBoard(board);

        set({
            board: cleanedBoard,
            isWin: true,
        });

        saveBoardToLocalStorage(task.id, cleanedBoard);

        return true;
    },
}));

export default storeGame;
