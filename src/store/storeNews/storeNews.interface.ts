import { INews } from "../../utils/api/api.interface";

/**
 * Интерфейс хранилища новостей
 * @interface
 */
interface IStoreNews {
    /** Массив новостей */
    news: INews[];

    /**
     * Устанавливает массив новостей в хранилище
     * @param {INews[]} news - Массив новостей
     */
    setNews: (news: INews[]) => void;
}

export default IStoreNews;
