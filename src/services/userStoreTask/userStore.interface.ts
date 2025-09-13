/**
 * Интерфейс хранилища данных пользователя
 * Содержит основную информацию о пользователе, его настройки, рейтинги и игровые данные
 */
export interface IUserStore {
    /** Имя пользователя */
    name: string;
    /** Фамилия пользователя (опционально) */
    surName?: string;
    /** Электронная почта пользователя */
    email: string;
    /** Дата рождения пользователя */
    dateOfBirth: string;
    /** Список разгаданных кроссвордов пользователя */
    crosswBoards: ICrosswBoard[] | null;
    /** Рейтинг пользователя */
    rating: number;
    /** Настройки пользователя */
    userSettings: IUserSettings;
    /** Токен авторизации пользователя */
    token: string;
    /** Дополнительный токен авторизации */
    accessToken: string;

    /**
     * Устанавливает новые кроссворды в хранилище
     * @param {ICrosswBoard} newBoard - Новый кроссворд для добавления
     */
    setCrosswordBoards: (newBoard: ICrosswBoard) => void;

    /**
     * Метод получения кроссворда по его ID
     *
     * Выполняет поиск кроссворда в хранилище по указанному ID.
     * Если кроссворд не найден, возвращает объект с дефолтными значениями.
     *
     * @param {number} id - Уникальный идентификатор кроссворда для поиска
     * @returns {ICrosswBoard} Объект кроссворда или объект с дефолтными значениями
     */
    getCrosswordBoardById: (id: number) => ICrosswBoard;

    /**
     * Устанавливает новый рейтинг пользователя
     * @param {number} rating - Новое значение рейтинга
     */
    setRating: (rating: number) => void;

    /**
     * Устанавливает информацию о пользователе
     * @param {IUserApi} userInfo - Объект с данными пользователя
     */
    setUserInfo: (userInfo: IUserApi) => void;
}

/**
 * Интерфейс данных пользователя для API
 * Содержит основную информацию о пользователе для обмена с API
 */
export interface IUserApi {
    /** Имя пользователя */
    name: string;
    /** Фамилия пользователя (опционально) */
    surName?: string;
    /** Электронная почта пользователя */
    email: string;
    /** Дата рождения пользователя */
    dateOfBirth: string;
    /** Настройки пользователя */
    userSettings: IUserSettings;
}

/**
 * Интерфейс настроек пользователя
 * Содержит информацию о настройках интерфейса и рассылке
 */
interface IUserSettings {
    /** Тема оформления */
    theme: ITheme;
    /** Флаг подписки на рассылку */
    mailing: boolean;
}

/**
 * Интерфейс темы оформления
 * Содержит параметры визуального оформления интерфейса
 */
interface ITheme {
    /**
     * Настройки элементов границы
     * @typedef {Object} BorderElement
     * @property {string} border - Цвет границ поля
     * @property {string} colorText - Цвет текста легенд
     * @property {string} board - Цвет фона поля
     * @property {string} cellColoring - Цвет закрашивания клеток
     * @property {number} width - Ширина ячейки
     * @property {number} height - Высота ячейки
     */
    borderElement: {
        border: string;
        colorText: string;
        board: string;
        cellColoring: string;
        width: number;
        height: number;
    };
}

/**
 * Интерфейс данных кроссвордного поля
 * Описывает структуру данных одного кроссвордного поля, включая результаты прохождения
 */
export interface ICrosswBoard {
    /** Флаг завершения игры */
    gameCompleted: boolean;
    /** ID поля */
    id: number;
    /** Время прохождения игры */
    time: string;
    /** Количество звезд за прохождение */
    star: number;
}
