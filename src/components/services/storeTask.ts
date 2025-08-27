import { create } from "zustand";
import { IApiTask, IApiTasks, ITask } from "../../utils/api/api.interface";
import { apiGetTask, apiGetTasks } from "../../utils/api/api";

/**
 * @interface Интерфейс хранилища задач
 */
interface ITaskStore {
    /** Текущая задача */
    task: ITask | null;
    /** Список всех задач */
    tasks: ITask[] | null;
    /** Флаг загрузки */
    isLoading: boolean;
    /** Сообщение об ошибке */
    error: string | null;
    /** Функция загрузки конкретной задачи */
    fetchTask: (taskId: number) => Promise<void>;
    /** Функция загрузки всех задач */
    fetchTasks: () => Promise<void>;
    /** Функция установки текущей задачи */
    setTask: (taskData: ITask | null) => void;
    /** Функция установки списка задач */
    setTasks: (tasksData: ITask[] | null) => void;
    /** Функция поиска задачи по ID */
    getTaskById: (id: string) => ITask | null;
    /** Функция очистки ошибки */
    clearError: () => void;
    getLoading: () => boolean;
}

/**
 * @function Вспомогательная асинхронная функция для загрузки конкретной задачи через API
 * @param {number} taskId - ID задачи для загрузки
 * @returns {Promise<IApiTask>} Объект с данными задачи
 * @throws {Error} Если произошла ошибка при загрузке
 */
const apiFetchTask = async (taskId: number): Promise<IApiTask> => {
    try {
        const response = await apiGetTask(taskId);
        return response;
    } catch (error) {
        console.error("Error in apiFetchTask:", error);
        throw error;
    }
};

/**
 * @function Вспомогательная асинхронная функция для загрузки всех задач через API
 * @returns {Promise<IApiTasks>} Объект со списком задач
 * @throws {Error} Если произошла ошибка при загрузке
 */
const apiFetchTasks = async (): Promise<IApiTasks> => {
    try {
        const response = await apiGetTasks();
        return response;
    } catch (error) {
        console.error("Error in apiFetchTasks:", error);
        throw error;
    }
};

/**
 * @function Хранилище Zustand для управления состоянием задач
 * @returns {ITaskStore} Объект хранилища с состоянием и методами
 *
 * @description
 * Хранилище предоставляет централизованное управление:
 * - Состоянием загрузки задач
 * - Данными текущей задачи и списка задач
 * - Ошибками API-запросов
 * - Методами для работы с задачами
 */
export const useTaskStore = create<ITaskStore>((set, get) => ({
    task: null,
    tasks: [],
    isLoading: false,
    error: null,

    /**
     * @async Загружает конкретную задачу по ID
     * @param {number} taskId - ID задачи для загрузки
     * @returns {Promise<void>}
     *
     * @description
     * Выполняет асинхронный запрос к API для получения задачи:
     * - Устанавливает флаг загрузки
     * - Обрабатывает успешный ответ
     * - Обрабатывает ошибки запроса
     * - Обновляет состояние хранилища
     */
    fetchTask: async (taskId: number) => {
        // Предотвращаем одновременные запросы
        if (get().isLoading) return;

        set({ isLoading: true, error: null });

        try {
            const taskData = await apiFetchTask(taskId);

            const transformedTask: ITask = {
                ...taskData,
            };

            set({
                task: transformedTask,
                isLoading: false,
            });
        } catch (err) {
            const errorMessage =
                err instanceof Error ? err.message : "Failed to fetch task";

            set({
                error: errorMessage,
                isLoading: false,
                task: null,
            });
        }
    },

    /**
     * @async Загружает все задачи
     * @returns {Promise<void>}
     *
     * @description
     * Выполняет асинхронный запрос к API для получения списка задач:
     * - Устанавливает флаг загрузки
     * - Обрабатывает успешный ответ
     * - Обрабатывает ошибки запроса
     * - Обновляет состояние хранилища
     */
    fetchTasks: async () => {
        // Предотвращаем одновременные запросы
        if (get().isLoading) return;

        set({ isLoading: true, error: null });

        try {
            const tasksData = await apiFetchTasks();

            const transformedTasks: ITask[] = tasksData.tasks || [];

            set({
                tasks: transformedTasks,
                isLoading: false,
            });
        } catch (err) {
            const errorMessage =
                err instanceof Error ? err.message : "Failed to fetch tasks";

            set({
                error: errorMessage,
                isLoading: false,
                tasks: [],
            });
        }
    },

    /**
     * Устанавливает текущую задачу
     * @param {ITask | null} taskData - Данные задачи или null для сброса
     */
    setTask: (taskData) => set({ task: taskData }),

    /**
     * Устанавливает список задач
     * @param {ITask[] | null} tasksData - Массив задач или null для сброса
     */
    setTasks: (tasksData) =>
        set({
            tasks: tasksData || [],
        }),

    /**
     * Находит задачу по ID в списке загруженных задач
     * @param {string} id - ID задачи для поиска
     * @returns {ITask | null} Найденная задача или null
     */
    getTaskById: (id) =>
        get().tasks?.find((task) => `${task.id}` === id.toString()) || null,

    getLoading: () => get().isLoading,

    /**
     * Очищает сообщение об ошибке
     */
    clearError: () => set({ error: null }),
}));
