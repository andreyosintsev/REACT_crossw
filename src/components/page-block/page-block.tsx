import { FC } from "react";

import IPageBlock from "./page-block.interface";
import styles from "./page-block.module.scss";

/**
 * @component - Универсальный компонент блока контента страницы
 * @param {string} title - Заголовок блока (опционально)
 * @param {ReactNode} children - Дочерние элементы блока
 * @returns {JSX.Element} Стилизованный блок контента с заголовком
 *
 * @description
 * Компонент реализует стилизованный контейнер для:
 * - Группировки логически связанного контента
 * - Добавления заголовков к разделам
 * - Создания отступов и визуального разделения
 *
 * @features
 * 1. Опциональный заголовок (рендерится только если передан)
 * 2. Поддержка любого содержимого через children
 * 3. Единообразие стилей для всех блоков страницы
 *
 * @see IPageBlock Интерфейс входных параметров
 **/
const PageBlock: FC<IPageBlock> = ({ title, children }) => {
    return (
        <div className={styles.block}>
            {title && <h2 className="block__title">{title}</h2>}
            {children}
        </div>
    );
};

export default PageBlock;
