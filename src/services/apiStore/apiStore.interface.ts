import { IApiTask, INews, ITask } from "../../utils/api/api.interface";

interface IApiStore {
    /** Флаг процесса загрузки */
    isLoading: boolean;
    /** Сообщение об ошибке */
    error: string | null;

    /**
     * Загружает задачу по ID через API
     * @async
     * @param {number} taskId - ID задачи для загрузки
     * @returns {Promise<ITask | null>} Объект задачи или null при ошибке
     *
     * @description
     * Выполняет асинхронный запрос к API для получения конкретной задачи:
     * - Устанавливает флаг загрузки
     * - Обрабатывает успешный ответ
     * - Обрабатывает ошибки и сохраняет сообщение
     * - Сбрасывает флаг загрузки в любом случае
     *
     * @example
     * const task = await fetchTask(5);
     * if (task) {
     *   console.log('Задача загружена:', task);
     * }
     */
    fetchTask: (
        task: number,
        options?: RequestInit
    ) => Promise<IApiTask | null>;

    /**
     * Загружает список всех задач через API
     * @async
     * @returns {Promise<ITask[] | null>} Массив задач или null при ошибке
     *
     * @description
     * Выполняет асинхронный запрос к API для получения списка задач:
     * - Не устанавливает флаг загрузки (для фоновой загрузки)
     * - Возвращает только массив tasks из ответа
     * - Обрабатывает ошибки и сохраняет сообщение
     *
     * @example
     * const tasks = await fetchTasks();
     * if (tasks) {
     *   setTasks(tasks);
     * }
     */
    fetchTasks: () => Promise<ITask[] | null>;

    /**
     * Загружает новости через API
     * @async
     * @returns {Promise<INews[]>} Массив новостей (пустой при ошибке)
     *
     * @description
     * Выполняет асинхронный запрос к API для получения новостей:
     * - Всегда возвращает массив (даже при ошибке)
     * - Обрабатывает ошибки и сохраняет сообщение
     * - Возвращает пустой массив при отсутствии данных
     *
     * @example
     * const news = await getNews();
     * news.forEach(item => console.log(item.title));
     */
    getNews: () => Promise<INews[]>;

    /**
     * Очищает сообщение об ошибке
     * @returns {void}
     *
     * @example
     * clearError();
     */
    clearError: () => void;

    /**
     * Устанавливает стандартное сообщение об ошибке
     * @returns {void}
     *
     * @description
     * Устанавливает общее сообщение об ошибке.
     * Полезно для ручной установки ошибок не связанных с API.
     *
     * @example
     * setError();
     */
    setError: () => void;

    /**
     * Устанавливает флаг загрузки вручную
     * @param {boolean} load - Состояние загрузки (true/false)
     * @returns {void}
     *
     * @example
     * setLoading(true); // Начало загрузки
     * setLoading(false); // Конец загрузки
     */
    setLoading: (load: boolean) => void;
}

export default IApiStore;
