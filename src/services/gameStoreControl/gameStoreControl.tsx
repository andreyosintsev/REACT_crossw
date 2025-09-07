import { create } from "zustand";
import IGameStoreControl from "./gameStoreControl.interface";
import { clearBoardInLocalStorage, clearCrossBoardsInLocalStorage, loadBoardFromLocalStorage, loadCrosswordBoardFromLocalStorage, saveBoardToLocalStorage, saveCrosswordBoardToLocalStorage } from "../../utils/local-storage/local-storage";
import IBoardElement from "../../pages/game/board-element/board-element.interface";
import { IHelp } from "../../pages/game/board/board.interface";

/**
 * Хранилище Zustand для управления игровым процессом кроссворда
 * @function
 * @returns {IGameStoreControl} Объект хранилища с полным контролем игры
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
export const gameStoreControl = create<IGameStoreControl>((set, get) => ({
    task: null,
    board: [],
    horizontalLegend: {
        legend: [null],
        width: 0,
        height: 0
    },
    verticalLegend: {
        legend: [null],
        width: 0,
        height: 0
    },
    help: {
        xCoord: -1,
        yCoord: -1,
        content: '',
        position: null
    },
    isWin: false,
    gameCompleted: false,
    errorTask: false,

    setError: (state) => set({ errorTask: state }),

    setTask: (task, userTaskInfo) => {
        if (!task) set({ errorTask: true })
        set({ task: task, gameCompleted: userTaskInfo.gameCompleted, isWin: false });
    },

    initializeGame: () => {
        const { task, createLegend, initBoard } = get();
        if (!task) return;

        createLegend();
        initBoard();
    },

    setHelp: (help) => set({ help: help }),

    handleHelp: () => {
        const { task } = get()
        let help: IHelp = {
            content: '',
            xCoord: 0,
            yCoord: 0,
            position: null
        };
        let pos = 0;
        if (!(task)) {
            return;
        }
        while (true) {
            pos = Math.floor(Math.random() * task.task.length);
            if (task.task[pos] === "1") {
                break;
            }
        }
        help.content = task.task[pos];
        help.position = pos;
        help.xCoord = pos % 5;

        const newBoard: IBoardElement[] = loadBoardFromLocalStorage(task.id) || [];

        // Если предоставлена position в подсказке - применяем подсказку
        if (help.position) {
            newBoard[help.position].xCoord = help.position % task.width;
            newBoard[help.position].yCoord = Math.floor(help.position / task.width);
            newBoard[help.position].content = "" + help.content;
        }

        // Устанавливаем состояние и сохраняем
        set({ board: newBoard });
        saveBoardToLocalStorage(task.id, newBoard);
    },

    initBoard: () => {
        const { task } = get();

        if (!task) return
        // Загружаем сохраненное состояние или создаем пустой массив
        const newBoard: IBoardElement[] = loadBoardFromLocalStorage(task.id) || [];

        // Если поле пустое - создаем новое
        if (newBoard.length === 0) {
            for (let y = 0; y < task.height; y++) {
                for (let x = 0; x < task.width; x++) {
                    newBoard.push({
                        xCoord: x,       // X-координата клетки
                        yCoord: y,       // Y-координата клетки
                        content: "0",    // Состояние: "0" - пусто, "1" - закрашено, "X" - крестик
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
            horizontalLegend: createHorizontalLegend(task)
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
        const max = Math.max(...legend.map(row => row.length), 0);

        // Выравниваем все строки до максимальной длины
        const equLegend: (number | null)[][] = legend.map(row => {
            const missing = max - row.length;
            return missing > 0
                ? [...Array(missing).fill(null), ...row]
                : [...row];
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
        let equLegend: (number | null)[][] = legend.map(col => [...col]);

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

        if (!task) return

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
        let newBoard = [...board]

        // Обрабатываем разные типы кликов
        switch (e.buttons) {
            case 1: // Левая кнопка мыши - закрашивание
                newBoard[cellIndex].content =
                    board[cellIndex].content !== "1" ? "1" : "0";
                break;
            case 2: // Правая кнопка мыши - крестик
                newBoard[cellIndex].content =
                    board[cellIndex].content !== "X" ? "X" : "0";
                break;
            default: // Другие кнопки - ноль по умолчанию
                newBoard[cellIndex].content =
                    board[cellIndex].content !== "X" ? "X" : "0";
        }

        // Обновляем состояние и сохраняем в localStorage
        set({ board: newBoard });
        checkWin(newBoard)
        saveBoardToLocalStorage(task.id, newBoard);
    },

    // Основная функция обработки событий
    handleBoardInteraction: (event: MouseEvent) => {
        const { handleBoardClick } = get();

        // Обработка кликов
        if ((event.buttons === 1 || event.buttons === 2) && event.type !== "mouseleave") {
            const eve = event as unknown as React.MouseEvent<Element, MouseEvent>;
            handleBoardClick(eve);
            return;
        }
    },

    handleRestart: (e) => {
        const { task, initBoard } = get()
        e.preventDefault();
        if (!task) return
        clearBoardInLocalStorage(task.id);
        clearCrossBoardsInLocalStorage(task.id)
        initBoard()
        const loadCrosswordBoard = loadCrosswordBoardFromLocalStorage(task.id);
        set({ gameCompleted: loadCrosswordBoard?.gameCompleted })
    },

    setWin: (status) => set({ isWin: status }),

    setGameCompleted: (status) => {
        const { task } = get();
        set({ gameCompleted: status });
        if (task)
            saveCrosswordBoardToLocalStorage(task.id, {
                gameCompleted: status,
                id: task.id,
                time: '',
                star: 0,
            })
    },

    checkWin: (board) => {
        const { task, isWin } = get();
        if (!task || isWin) return false
        if (board.length === 0) {
            return;
        }

        for (let i = 0; i < board.length; i++) {
            const content =
                board[i].content === "X" ? "0" : board[i].content;

            if (content !== task.task[i]) {
                return;
            }
        }

        const cleanedBoard = board.map(element => ({
            ...element,
            content: element.content === "X" ? "0" : element.content
        }));

        set({ board: cleanedBoard, isWin: true })
        saveBoardToLocalStorage(task.id, cleanedBoard);
    },
}));