import { create } from "zustand";
import IApiStore from "./apiStore.interface";
import { apiGetNews, apiGetTask, apiGetTasks } from "../../utils/api/api";

/**
 * Хранилище Zustand для управления API-запросами приложения
 * @function
 * @returns {IApiStore} Объект хранилища с методами для работы с API
 * 
 * @description
 * Централизованное хранилище для управления всеми API-запросами:
 * - Управление состоянием загрузки
 * - Обработка и хранение ошибок
 * - Упрощение работы с асинхронными запросами
 * - Единая точка для всех API-взаимодействий
 * 
 * @example
 * // Использование в компоненте
 * const { fetchTask, isLoading, error, clearError } = apiStore();
 */
const apiStore = create<IApiStore>((set) => ({
    isLoading: false,
    error: null,

    fetchTask: async (taskId: number) => {
        try {
            const taskData = await apiGetTask(taskId);

            return taskData;
        } catch (err) {
            const errorMessage =
                err instanceof Error ? err.message : "Failed to fetch task";

            set({
                error: errorMessage,
            });
            return null;
        } finally {
            set({
                isLoading: false,
            });
        }
    },

    fetchTasks: async () => {
        try {
            const tasksData = await apiGetTasks();

            return tasksData.tasks
        } catch (err) {
            const errorMessage =
                err instanceof Error ? err.message : "Failed to fetch tasks";

            set({
                error: errorMessage,
            });
            return null
        }
    },

    getNews: async () => {
        try {
            const news = await apiGetNews()

            return news.news || []
        } catch (err) {
            const errorMessage =
                err instanceof Error ? err.message : "Failed to fetch news";

            set({
                error: errorMessage
            })
            return []
        }
    },

    clearError: () => set({ error: null }),

    setError: () => set({ error: "Ошибка" }),

    setLoading: (load) => set({ isLoading: load }),
}));

export default apiStore;
