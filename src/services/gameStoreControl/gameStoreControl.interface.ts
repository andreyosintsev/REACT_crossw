import IBoardElement from "../../pages/game/board-element/board-element.interface";
import { IHelp } from "../../pages/game/board/board.interface";
import ILegendHorizontal from "../../pages/game/legend-horizontal/legend-horizontal.interface";
import { IVerticalLegend } from "../../pages/game/table/table.interface";
import { ITask } from "../../utils/api/api.interface";
import { ICrosswBoard } from "../userStoreTask/userStore.interface";

interface IGameStoreControl {
    /** Текущая задача кроссворда */
    task: ITask | null;
    /** Состояние игрового поля */
    board: IBoardElement[];
    /** Горизонтальная легенда (подсказки сверху) */
    horizontalLegend: ILegendHorizontal;
    /** Вертикальная легенда (подсказки слева) */
    verticalLegend: IVerticalLegend;
    /** Текущая активная подсказка */
    help: IHelp;
    /** Флаг победы в игре */
    isWin: boolean;
    /** Флаг пройденной игры */
    gameCompleted: boolean;
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
    setTask: (task: ITask | null, userTaskInfo: ICrosswBoard) => void;

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
     * Устанавливает активную подсказку
     * @param {IHelp} help - Объект подсказки
     */
    setHelp: (help: IHelp) => void;

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
    handleHelp: () => void;

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
    createLegend: () => void;

    /**
     * Создает вертикальную легенду (подсказки слева)
     * @param {ITask} task - Объект задачи
     * @returns {ILegend} Объект вертикальной легенды
     *
     * @description
     * Анализирует решение по строкам и создает числовые подсказки
     */
    createVerticalLegend: (task: ITask) => IVerticalLegend;

    /**
     * Создает горизонтальную легенду (подсказки сверху)
     * @param {ITask} task - Объект задачи
     * @returns {ILegend} Объект горизонтальной легенды
     *
     * @description
     * Анализирует решение по столбцам и создает числовые подсказки
     */
    createHorizontalLegend: (task: ITask) => ILegendHorizontal;

    /**
     * Обрабатывает клик по игровому полю
     * @param {React.MouseEvent} e - Событие мыши
     * @returns {void}
     *
     * @description
     * Обрабатывает взаимодействия пользователя с полем:
     * - Левая кнопка: переключает закрашивание клетки
     * - Правая кнопка: переключает крестик
     * - Сохраняет изменения в localStorage
     */
    handleBoardClick: (e: React.MouseEvent) => void;

    /**
     * Обрабатывает взаимодействия с игровым полем
     * @param {MouseEvent} event - Событие мыши
     * @returns {void}
     *
     * @description
     * Главный обработчик событий для игрового поля
     */
    handleBoardInteraction: (event: MouseEvent) => void;

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
    handleRestart: (e: React.MouseEvent) => void;

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

export default IGameStoreControl;
