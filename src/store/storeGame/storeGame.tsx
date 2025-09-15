import { create } from "zustand";
import IStoreGame from "./storeGame.interface";
import {
    clearBoardInLocalStorage,
    clearCrossBoardsInLocalStorage,
    loadBoardFromLocalStorage,
    loadCrosswordBoardFromLocalStorage,
    saveBoardToLocalStorage,
    saveCrosswordBoardToLocalStorage,
} from "../../utils/local-storage/local-storage";
import IBoardElement from "../../pages/game/board-element/board-element.interface";
import { IHelp } from "../../pages/game/board/board.interface";

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
export const storeGame = create<IStoreGame>((set, get) => ({
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
    isWin: false,
    gameCompleted: false,
    errorTask: false,

    setError: (state) => set({ errorTask: state }),

    setTask: (task, userTaskInfo) => {
        if (!task) set({ errorTask: true });
        set({
            task: task,
            gameCompleted: userTaskInfo.gameCompleted,
            isWin: false,
        });
    },

    initializeGame: () => {
        const { task, createLegend, initBoard } = get();
        if (!task) return;

        createLegend();
        initBoard();
    },

    handleHelp: () => {
        //1. Получить текущую задачу
        //2. Получить текущее состояние поля
        //3. Создать новый массив help несовпадающих элементов
        //4. Пробегаем элементы массив задачи и сравниваем с текущим состоянием поля
        //5. Если клетка в задаче и в текущем состоянии не совпадают, то
        //6. Добавляем в массив координату несоответствующей клетки
        //7. Рандомом выбираем один из элементов получившегося массива
        //8. Закрашиваем клетку текущего состояния этим элементом.

        const { task, board } = get();
        if (!task || board.length === 0) return;

        const help: {
            pos: number;
            content: string;
        }[] = [];

        const n = Math.min(task.task.length, board.length);
        for (let i = 0; i < n; i++) {
            if (
                (task.task[i] === "0" && board[i]?.content === "1") ||
                (task.task[i] === "1" && (board[i]?.content === "0" || board[i]?.content === "X"))
            )
                help.push({ pos: i, content: task.task[i] });
        }

        if (help.length === 0) return;

        const index = Math.floor(Math.random() * help.length);
        const newBoard = board.map((cell, idx) => (idx === help[index].pos ? { ...cell, content: help[index].content } : cell));

        // Устанавливаем состояние и сохраняем
        set((state) => ({ board: newBoard }));
        saveBoardToLocalStorage(task.id, newBoard);
    },

    initBoard: () => {
        const task = get().task;

        if (!task) return;
        // Загружаем сохраненное состояние или создаем пустой массив
        const newBoard: IBoardElement[] = loadBoardFromLocalStorage(task.id) || [];

        // Если поле пустое - создаем новое
        if (newBoard.length === 0) {
            for (let y = 0; y < task.height; y++) {
                for (let x = 0; x < task.width; x++) {
                    newBoard.push({
                        xCoord: x, // X-координата клетки
                        yCoord: y, // Y-координата клетки
                        content: "0", // Состояние: "0" - пусто, "1" - закрашено, "X" - крестик
                    });
                }
            }
        }

        set({ board: newBoard });
        saveBoardToLocalStorage(task.id, newBoard);
    },

    createLegend: () => {
        const { task, createVerticalLegend, createHorizontalLegend } = get();
        if (!task) return;

        set({
            verticalLegend: createVerticalLegend(task),
            horizontalLegend: createHorizontalLegend(task),
        });
    },

    createVerticalLegend: (task) => {
        const legend: number[][] = [];

        // Анализируем каждую строку
        for (let y = 0; y < task.height; y++) {
            const row: number[] = [];
            let sum = 0;

            for (let x = 0; x < task.width; x++) {
                const index = y * task.width + x;
                if (task.task[index] === "1") {
                    sum++;
                } else {
                    if (sum > 0) {
                        row.push(sum);
                        sum = 0;
                    }
                }
            }

            if (sum > 0) {
                row.push(sum);
            }

            legend.push(row);
        }

        // Находим максимальное количество подсказок в строке
        const max = Math.max(...legend.map((row) => row.length), 0);

        // Выравниваем все строки до максимальной длины
        const equLegend: (number | null)[][] = legend.map((row) => {
            const missing = max - row.length;
            return missing > 0 ? [...Array(missing).fill(null), ...row] : [...row];
        });

        // Преобразуем в плоский массив для отображения
        const outLegend: (number | null)[] = [];
        for (let y = 0; y < equLegend.length; y++) {
            for (let x = 0; x < max; x++) {
                outLegend.push(equLegend[y][x]);
            }
        }

        return {
            legend: outLegend,
            width: max,
            height: equLegend.length,
        };
    },

    createHorizontalLegend: (task) => {
        let legend = [];
        let col = [];

        for (let x = 0; x < task.width; x++) {
            let sum = 0;
            for (let y = 0; y < task.height; y++) {
                if (task.task[y * task.width + x] === "1") {
                    sum++;
                } else {
                    if (sum > 0) {
                        col.push(sum);
                    }
                    sum = 0;
                }
            }
            if (sum > 0) {
                col.push(sum);
            }

            legend.push(col);
            col = [];
        }

        // Находим максимальное количество подсказок в столбце
        let max = 0;
        legend.forEach((col) => {
            max = col.length > max ? col.length : max;
        });

        // Выравниваем все столбцы до максимальной длины
        let equLegend: (number | null)[][] = legend.map((col) => [...col]);

        legend.forEach((col, num) => {
            if (col.length < max) {
                for (let i = col.length; i < max; ++i) {
                    equLegend[num].unshift(null);
                }
            }
        });

        // Преобразуем в плоский массив для отображения
        const outLegend = [];

        for (let y = 0; y < max; y++) {
            for (let x = 0; x < equLegend.length; x++) {
                outLegend.push(equLegend[x][y]);
            }
        }

        return {
            legend: outLegend,
            width: Math.floor(outLegend.length / max),
            height: max,
        };
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
        const x = +target.dataset.x;
        const y = +target.dataset.y;
        const cellIndex = y * task.width + x;

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

    handleRestart: (e) => {
        const { task, initBoard } = get();
        e.preventDefault();
        if (!task) return;
        clearBoardInLocalStorage(task.id);
        clearCrossBoardsInLocalStorage(task.id);
        initBoard();
        const loadCrosswordBoard = loadCrosswordBoardFromLocalStorage(task.id);
        set({ gameCompleted: loadCrosswordBoard?.gameCompleted });
    },

    setWin: (status) => set({ isWin: status }),

    setGameCompleted: (status) => {
        //@todo - надо проверить логику, что если !task - нужно ли устанавливать статус. А если нет, то set можно и не выполнять?
        const task = get().task;
        set({ gameCompleted: status });
        if (task)
            saveCrosswordBoardToLocalStorage(task.id, {
                gameCompleted: status,
                id: task.id,
                time: "",
                star: 0,
            });
    },

    checkWin: (board) => {
        const { task, isWin } = get();
        if (!task || isWin) return false;
        if (board.length === 0) {
            return;
        }

        for (let i = 0; i < board.length; i++) {
            const content = board[i].content === "X" ? "0" : board[i].content;

            if (content !== task.task[i]) {
                return;
            }
        }

        const cleanedBoard = board.map((element) => ({
            ...element,
            content: element.content === "X" ? "0" : element.content,
        }));

        set({ board: cleanedBoard, isWin: true });
        saveBoardToLocalStorage(task.id, cleanedBoard);
    },
}));
