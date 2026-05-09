import { create } from "zustand";
import IStoreGame from "./storeGame.interface";
import {
    clearBoardInLocalStorage,
    clearCrosswordInLocalStorage,
    loadBoardFromLocalStorage,
    loadCrosswordFromLocalStorage,
    saveBoardToLocalStorage,
    saveCrosswordToLocalStorage,
} from "../../utils/local-storage/local-storage";

import { createEmptyBoard, generateLegends, getCellIndex, isBoardSolved, cleanBoard } from "../../utils/game/game";
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
        if (!task) set({ errorTask: true });
        set({
            task: task,
            solved: userTaskInfo.solved,
            isWin: false,
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

    handleBoardClick: (e) => {
        const { task, board, checkWin } = get();
        // Предотвращаем стандартное поведение браузера
        e.preventDefault();

        if (!task) return;

        const target = e.target as HTMLElement;

        // Проверяем наличие dataset свойств
        if (!target.dataset.x || !target.dataset.y) {
            return;
        }

        // Получаем координаты клетки
        const cellIndex = getCellIndex(Number(target.dataset.x), Number(target.dataset.y), task.width);

        // Создаем копию текущего состояния поля
        let newBoard = [...board];

        // Обрабатываем разные типы кликов
        switch (e.buttons) {
            case 1: // Левая кнопка мыши - закрашивание
                newBoard[cellIndex].content = board[cellIndex].content !== "1" ? "1" : "0";
                break;
            case 2: // Правая кнопка мыши - крестик
                newBoard[cellIndex].content = board[cellIndex].content !== "X" ? "X" : "0";
                break;
            default: // Другие кнопки - ноль по умолчанию
                newBoard[cellIndex].content = board[cellIndex].content !== "X" ? "X" : "0";
        }

        // Обновляем состояние и сохраняем в localStorage
        set({ board: newBoard });
        checkWin(newBoard);
        saveBoardToLocalStorage(task.id, newBoard);
    },

    // Основная функция обработки событий
    handleBoardInteraction: (event: MouseEvent) => {
        const handleBoardClick = get().handleBoardClick;

        // Обработка кликов
        if ((event.buttons === 1 || event.buttons === 2) && event.type !== "mouseleave") {
            const eve = event as unknown as React.MouseEvent<Element, MouseEvent>;
            handleBoardClick(eve);
            return;
        }
    },

    restartGame: () => {
        const { task, initBoard } = get();
        if (!task) return;

        clearBoardInLocalStorage(task.id);
        clearCrosswordInLocalStorage(task.id);

        initBoard();
        const crossword = loadCrosswordFromLocalStorage(task.id);

        set({
            solved: crossword?.solved ?? false,
            isWin: false,
        });
    },

    setGameCompleted: (status) => {
        //@todo - надо проверить логику, что если !task - нужно ли устанавливать статус. А если нет, то set можно и не выполнять?
        const task = get().task;
        set({ solved: status });
        if (task)
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
