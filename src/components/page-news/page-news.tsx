import { FC, useState, useEffect } from "react";

import { apiGetNews } from "../../utils/api/api";
import { INewsLoading } from "./page-news.interface";
import PageNewsUI from "../ui/page-news/page-news";

/**
 * @component - Компонент блока новостей сайта
 * @returns {JSX.Element} Блок с лентой новостей и состоянием загрузки
 *
 * @property {Object} newsLoading - Состояние загрузки новостей:
 * @property {boolean} isLoading - Флаг процесса загрузки
 * @property {boolean} hasError - Флаг ошибки загрузки
 * @property {INews[]} news - Массив загруженных новостей
 *
 * @method getNews - Загружает новости с сервера
 *
 * @see apiGetNews API-метод для получения новостей
 * @see INews Интерфейс структуры новости
 * 
 * @description
 * Компонент отображает список новостей с возможностями:
 * - Автоматическая загрузка новостей при монтировании
 * - Отображение состояния загрузки
 * - Обработка ошибок при загрузке
 * - Форматированное отображение даты и текста новости
 **/
const PageNews: FC = () => {
    const [newsLoading, setNewsLoading] = useState<INewsLoading>({
        isLoading: false,
        hasError: false,
        news: [],
    });

    const getNews = () => {
        setNewsLoading({
            isLoading: true,
            hasError: false,
            news: [],
        });

        try {
            apiGetNews()
                .then((data) => {
                    setNewsLoading({
                        isLoading: false,
                        hasError: false,
                        news: data.news,
                    });
                })
                .catch((error) => {
                    console.error(`Ошибка Promise: ${error}`);
                    setNewsLoading({
                        isLoading: false,
                        hasError: true,
                        news: [],
                    });
                });
        } catch (error) {
            const errorMessage: string =
                error instanceof Error ? error.message : "";
            console.error(
                `Не удалось получить новости от API: ${errorMessage}`
            );
            setNewsLoading({
                isLoading: false,
                hasError: true,
                news: [],
            });
        }
    };

    useEffect(() => getNews(), []);

    return (
        <PageNewsUI newsLoading={newsLoading}></PageNewsUI>
    );
};

export default PageNews;