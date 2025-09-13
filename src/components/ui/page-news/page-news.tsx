import { FC } from "react";
import { v4 as uuid } from "uuid";

import styles from "./page-news.module.scss";

import IPageNewsUI from "./page-new.interface";

/**
 * @component Визуальный компонент новостной ленты
 * 
 * @param {Object} IPageNewsUI - Интерфейс пропсов компонента новостей
 * @param {Object} news - Объект новостей
 * 
 * @returns {JSX.Element} Визуализированный компонент новостной ленты
 * 
 * @description Базовый UI-компонент для отображения новостной ленты
 * с возможностью отображения состояния загрузки и ошибок
 */
const PageNewsUI: FC<IPageNewsUI> = ({ news }) => {
    return (
        <>
            <ul className={styles.news__items}>
                {news.map((news) => (
                    <li className={styles.entry} key={uuid()}>
                        <div className={styles.entry__date}>{news.date}</div>
                        <div className={styles.entry__content}>{news.text}</div>
                    </li>
                ))}
            </ul>
        </>
    );
};

export default PageNewsUI;