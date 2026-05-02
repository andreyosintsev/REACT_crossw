import { create } from "zustand";
import IStoreApp from "./storeApp.interface";

/**
 * Хранилище Zustand для хранения состояния приложения
 * @function
 * @returns {IStoreApp} Объект хранилища с методами для работы с API
 *
 * @description
 * Централизованное хранилище для управления состояниями приложения:
 * - Отображение мобильного меню
 * - Управление состоянием загрузки
 * - Обработка и хранение ошибок
 */
const storeApp = create<IStoreApp>((set) => ({
    isLoading: false,
    error: null,

    setLoading: (value) => set({ isLoading: value }),
    setError: (value) => set({ error: value }),
    clearError: () => set({ error: null }),

    isMenuMobileOpen: false,
    isModalOpen: false,
    setMenuMobile: (isOpen) => set({ isMenuMobileOpen: isOpen }),
    setModal: (isOpen) => set({ isModalOpen: isOpen }),

    closeAllOverlays: () => {
        set({ isMenuMobileOpen: false });
        set({ isModalOpen: false });
    },
}));

export default storeApp;
