import { FC } from "react";

import PageNewsUI from "../ui/page-news/page-news";
import storeNews from "../../store/storeNews/storeNews";

/**
 * Компонент-контейнер для блока новостей сайта
 *
 * @component
 * @returns {JSX.Element} Контейнер новостей с подключением к хранилищу
 *
 * @description
 * Компонент выполняет роль контейнера (container component) для новостного блока:
 * - Получает данные новостей из глобального хранилища Zustand
 * - Передает данные в презентационный компонент PageNewsUI
 * - Не содержит собственной логики отображения
 * - Обеспечивает разделение ответственности между логикой и представлением
 *
 * @pattern
 * Использует паттерн "Container/Presenter" для разделения:
 * - Container: работа с данными и состоянием
 * - Presenter: чистое отображение (PageNewsUI)
 *
 * @example
 * // Использование в родительском компоненте
 * <PageNews />
 */
const PageNews: FC = () => {
    // Получаем массив новостей из хранилища с помощью селектора
    const news = storeNews((state) => state.news);

    return <PageNewsUI news={news}></PageNewsUI>;
};

export default PageNews;
