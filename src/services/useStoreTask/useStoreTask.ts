import { create } from "zustand";
import { ITask } from "../../utils/api/api.interface";
import { apiGetTask, apiGetTasks } from "../../utils/api/api";
import IStoreTask from "./useStoreTask.interface";

/**
 * @function Хранилище Zustand для управления состоянием задач
 * @returns {IStoreTask} Объект хранилища с состоянием и методами
 *
 * @description
 * Хранилище предоставляет централизованное управление:
 * - Состоянием загрузки задач
 * - Данными текущей задачи и списка задач
 * - Ошибками API-запросов
 * - Методами для работы с задачами
 */
export const useStoreTask = create<IStoreTask>((set, get) => ({
    task: null,
    tasks: [],
    isLoading: false,
    error: null,

    /**
     * @async Загружает конкретную задачу по ID
     * @param {number} taskId - ID задачи для загрузки
     * @returns {void}
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
            const taskData = await apiGetTask(taskId);

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
     * @returns {void}
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
            const tasksData = await apiGetTasks();

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
}));
