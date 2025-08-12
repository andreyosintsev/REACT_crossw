import { FC, useState, useEffect } from "react";
import { v4 as uuid } from "uuid";

import styles from "./page-news.module.scss";

import { apiGetNews } from "../../utils/api/api";
import { INewsLoading } from "./page-news.interface";

/**
 * @component - Компонент блока новостей сайта
 * @returns {JSX.Element} Блок с лентой новостей и состоянием загрузки
 *
 * @description
 * Компонент отображает список новостей с возможностями:
 * - Автоматическая загрузка новостей при монтировании
 * - Отображение состояния загрузки
 * - Обработка ошибок при загрузке
 * - Форматированное отображение даты и текста новости
 *
 * @state
 * @property {Object} newsLoading - Состояние загрузки новостей:
 * @property {boolean} isLoading - Флаг процесса загрузки
 * @property {boolean} hasError - Флаг ошибки загрузки
 * @property {INews[]} news - Массив загруженных новостей
 *
 * @method getNews - Загружает новости с сервера
 *
 * @see apiGetNews API-метод для получения новостей
 * @see INews Интерфейс структуры новости
 **/
const PageBlock: FC = () => {
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
        <>
            {newsLoading.isLoading && <p>Загрузка новостей...</p>}
            {!newsLoading.isLoading && newsLoading.hasError && (
                <p>Ошибка загрузки новостей</p>
            )}
            <ul className={styles.news__items}>
                {newsLoading.news.map((news) => (
                    <li className={styles.entry} key={uuid()}>
                        <div className={styles.entry__date}>{news.date}</div>
                        <div className={styles.entry__content}>{news.text}</div>
                    </li>
                ))}
            </ul>
        </>
    );
};

export default PageBlock;
