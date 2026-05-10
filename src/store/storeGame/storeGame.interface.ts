import { IBoardElement } from "../../components/game/board-element/board-element.interface";
import { ILegendHorizontal } from "../../components/game/legend-horizontal/legend-horizontal.interface";
import { ILegendVertical } from "../../components/game/legend-vertical/legend-vertical.interface";
import { TCellAction } from "../../types/game";

import { ITask } from "../../utils/api/api.interface";
import { ICrossword } from "../storeUser/storeUser.interface";

interface IStoreGame {
    /** Текущая задача кроссворда */
    task: ITask | null;
    /** Состояние игрового поля */
    board: IBoardElement[];
    /** Горизонтальная легенда (подсказки сверху) */
    horizontalLegend: ILegendHorizontal;
    /** Вертикальная легенда (подсказки слева) */
    verticalLegend: ILegendVertical;
    /** Флаг победы в игре */
    isWin: boolean;
    /** Флаг пройденной игры */
    solved: boolean;
    /** Флаг ошибки загрузки задачи */
    errorTask: boolean;

    /**
     * Устанавливает флаг ошибки задачи
     * @param {boolean} state - Состояние ошибки
     */
    setError: (state: boolean) => void;

    /**
     * Устанавливает текущую задачу и информацию о пользователе
     * @param {ITask | null} task - Объект задачи
     * @param {IUserTaskInfo} userTaskInfo - Информация о выполнении задачи пользователем
     */
    setTask: (task: ITask | null, userTaskInfo: ICrossword) => void;

    /**
     * Инициализирует игровой процесс
     * @returns {void}
     *
     * @description
     * Запускает процесс подготовки игры:
     * - Создает легенды на основе задачи
     * - Инициализирует игровое поле
     */
    initializeGame: () => void;

    /**
     * Генерирует и применяет случайную подсказку
     * @returns {void}
     *
     * @description
     * Создает случайную подсказку для игрока:
     * - Выбирает случайную закрашенную клетку из решения
     * - Применяет подсказку к игровому полю
     * - Сохраняет обновленное состояние
     */
    giveHint: () => void;

    /**
     * Инициализирует игровое поле
     * @returns {void}
     *
     * @description
     * Создает новое поле или загружает сохраненное:
     * - Проверяет наличие сохраненного состояния в localStorage
     * - Создает пустое поле если сохранений нет
     * - Сохраняет состояние в localStorage
     */
    initBoard: () => void;

    /**
     * Создает легенды для текущей задачи
     * @returns {void}
     *
     * @description
     * Генерирует горизонтальные и вертикальные легенды:
     * - Анализирует структуру решения задачи
     * - Создает числовые подсказки для строк и столбцов
     */
    createLegends: () => void;

    /**
     * Обрабатывает взаимодействие указателя и клетки
     *
     * @param xCoord - координата X клетки
     * @param yCoord - координата Y клетки
     * @param action - действие
     * @returns
     */
    applyCellAction: (xCoord: number, yCoord: number, action: TCellAction) => void;

    /**
     * Обрабатывает перезапуск игры
     * @param {React.MouseEvent} e - Событие клика
     * @returns {void}
     *
     * @description
     * Сбрасывает прогресс игры:
     * - Очищает сохранения в localStorage
     * - Инициализирует новое поле
     * - Сбрасывает статус завершения
     */
    restartGame: () => void;

    /**
     * Устанавливает статус победы
     * @param {boolean} status - Статус победы
     */
    setWin: (status: boolean) => void;

    /**
     * Устанавливает статус пройденной игры
     * @param {boolean} status - Статус завершения
     */
    setGameCompleted: (status: boolean) => void;

    /**
     * Проверяет условие победы в игре
     * @param {IBoardElement[]} board - Текущее состояние поля
     * @returns {void}
     *
     * @description
     * Сравнивает текущее состояние поля с эталонным решением:
     * - Игнорирует клетки с крестиком (считает их пустыми)
     * - Устанавливает флаг победы при полном совпадении
     * - Очищает поле от крестиков при победе
     */
    checkWin: (borad: IBoardElement[]) => void;
}

export default IStoreGame;
