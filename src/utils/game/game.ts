import { ICrossword } from "../../store/storeUser/storeUser.interface";
import { ITask } from "../api/api.interface";
import IBoardElement from "../../components/game/board-element/board-element.interface";
import ILegendVertical from "../../components/game/legend-vertical/legend-vertical.interface";
import ILegendHorizontal from "../../components/game/legend-horizontal/legend-horizontal.interface";

/**
 * Метод задания кроссворда по умолчанию, если кроссворд
 * не был найден в локальном хранилище
 */

export const getDefaultCrossword = (id: number): ICrossword => ({
    solved: false,
    id,
    time: "",
    stars: 0,
});

/**
 * Обновление или добавление кроссворда в стор
 *
 * @param crosswords - массив кроссвордов из стора
 * @param crossword - добавляемый или обновляемый кровссворд
 * @returns обновленный массив кроссвордов для сохранения в стор
 */

export const upsertCrossword = (crosswords: ICrossword[], crossword: ICrossword): ICrossword[] => {
    return crosswords.some((c) => c.id === crossword.id)
        ? crosswords.map((c) => (c.id === crossword.id ? crossword : c))
        : [...crosswords, crossword];
};

/**
 * Поиск кроссворда по id
 *
 * @param crosswords - массив кроссвордов из стора
 * @param id - id кроссворда
 * @returns  - найденный кроссворд или кроссворд по умолчанию
 */

export const findCrosswordById = (crosswords: ICrossword[], id: number): ICrossword => {
    return crosswords.find((c) => c.id === id) ?? getDefaultCrossword(id);
};

/**
 * Создание пустого игрового поля
 *
 * @param task - задача, по размерам которой формируется поле
 * @returns
 */

export const createEmptyBoard = (task: ITask): IBoardElement[] => {
    const newBoard: IBoardElement[] = [];

    for (let y = 0; y < task.height; y++) {
        for (let x = 0; x < task.width; x++) {
            newBoard.push({
                xCoord: x, // X-координата клетки
                yCoord: y, // Y-координата клетки
                content: "0", // Состояние: "0" - пусто, "1" - закрашено, "X" - крестик
            });
        }
    }

    return newBoard;
};

/**
 * Создание вертикальной легенды
 *
 * @param task - задача, по которой которой формируется легенда
 * @returns
 */

export const createVerticalLegend = (task: ITask): ILegendVertical => {
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
};

/**
 *
 * Создание горизонтальной легенды
 *
 * @param task - задача, по которой которой формируется легенда
 * @returns
 */

export const createHorizontalLegend = (task: ITask): ILegendHorizontal => {
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
};

/**
 * Формирование вертикальной и горизонтальной легенды на основе задачи
 *
 * @param task - задача
 * @returns - объект с двумя легендами
 */

export const generateLegends = (task: ITask) => ({
    verticalLegend: createVerticalLegend(task),
    horizontalLegend: createHorizontalLegend(task),
});

/**
 * Получение индекса клетки по координатам и ширине поля
 *
 * @param x - X-координата клетки
 * @param y - Y-координата клетки
 * @param width - Ширина поля
 */

export const getCellIndex = (x: number, y: number, width: number): number => y * width + x;

/**
 * Преобразование содержимого клетки для проверки
 *
 * @param content - содержимое клетки
 *
 **/

export const normalizeCellContentForCheck = (content: IBoardElement["content"]) => (content === "X" ? "0" : content);

/**
 * Проверка соответствия состояния доски задаче - если соответствует, то кроссворд решен
 *
 * @param task - задача
 * @param board - доска
 * @returns
 */

export const isBoardSolved = (task: ITask, board: IBoardElement[]): boolean => {
    if (board.length !== task.task.length) {
        return false;
    }

    return board.every((cell, index) => normalizeCellContentForCheck(cell.content) === task.task[index]);
};

/**
 * Очистка поля от Х
 *  *
 * @param board - поле для очистки
 * @returns - очищенная доска с нормализованным содержимым
 */

export const cleanBoard = (board: IBoardElement[]): IBoardElement[] =>
    board.map((cell) => ({
        ...cell,
        content: normalizeCellContentForCheck(cell.content),
    }));
