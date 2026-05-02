import { INews } from "../../../utils/api/api.interface";

import styles from "./newsUI.module.scss";

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

interface INewsUI {
    news: INews[];
}

const NewsUI = ({ news }: INewsUI) => {
    return (
        <>
            <ul className={styles.news__items}>
                {news.map((news, index) => (
                    <li className={styles.entry} key={index}>
                        <div className={styles.entry__date}>{news.date}</div>
                        <div className={styles.entry__content}>{news.text}</div>
                    </li>
                ))}
            </ul>
        </>
    );
};

export default NewsUI;
