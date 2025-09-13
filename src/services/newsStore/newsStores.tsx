import { create } from "zustand";
import INewsStore from "./newsStores.interface";

/**
 * Хранилище Zustand для управления новостями
 * @function
 * @returns {INewsStore} Объект хранилища с состоянием и методами
 * 
 * @description
 * Минималистичное хранилище для управления списком новостей с:
 * - Возможностью установки всего массива новостей
 * - Простой и предсказуемой структурой
 * - Полной типобезопасностью TypeScript
 * 
 * @example
 * // Использование в компоненте
 * const { news, setNews } = newsStore();
 * 
 * // Загрузка новостей
 * setNews(loadedNews);
 * 
 * // Получение новостей
 * console.log('Количество новостей:', news.length);
 */
const newsStore = create<INewsStore>((set, get) => ({
    news: [],

    setNews: (news) => set({ news: news }),
}));

export default newsStore;
