import { create } from "zustand";
import IStoreTask from "./storeTasks.interface";

/**
 * Хранилище Zustand для управления задачами
 * @function
 * @returns {IStoreTask} Объект хранилища с состоянием и методами
 *
 * @description
 * Легковесное хранилище для управления массивом задач с:
 * - Возможностью установки всего массива задач
 * - Быстрым поиском задачи по ID
 * - Простой и эффективной структурой
 *
 * @example
 * // Использование в компоненте
 * const { tasks, setTasks, getTaskById } = useStoreTask();
 *
 * // Загрузка задач
 * setTasks(loadedTasks);
 *
 * // Поиск задачи
 * const task = getTaskById(5);
 */
const storeTasks = create<IStoreTask>((set, get) => ({
    tasks: [],

    setTasks: (tasksData) =>
        set({
            tasks: tasksData || [],
        }),

    getTaskById: (id) =>
        get().tasks.find((task) => task.id.toString() === id.toString()) ||
        null,
}));

export default storeTasks;
