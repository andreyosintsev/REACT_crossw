import { create } from "zustand";
import IStoreApp from "./storeApp.interface";

/**
 * Хранилище Zustand для хранения состояния загрузки приложения
 * @function
 * @returns {IStoreApp} Объект хранилища с методами для работы с API
 *
 * @description
 * Централизованное хранилище для управления состояниями загрузки:
 * - Управление состоянием загрузки
 * - Обработка и хранение ошибок
 *
 * @example
 * // Использование в компоненте

 */
const storeApp = create<IStoreApp>((set) => ({
    isLoading: false,
    error: null,

    setLoading: (value) => set({ isLoading: value }),
    setError: (value) => set({ error: value }),
    clearError: () => set({ error: null })
}));

export default storeApp;
