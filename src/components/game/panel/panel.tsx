import { ReactNode } from "react";

import styles from "./panel.module.scss";

/**
 * @component - Универсальный компонент панели (контейнера)
 * @param {ReactNode} children - Дочерние элементы для размещения внутри панели
 * @returns {JSX.Element} Контейнер с дочерними элементами
 *
 * @description
 * Компонент представляет собой стилизованный контейнер для:
 * - Группировки логически связанных элементов
 * - Создания визуальных разделов интерфейса
 * - Применения общих стилей к группе компонентов
 *
 * @note
 * Компонент является чисто презентационным и не содержит логики
 *
 * @see PanelStyles Модуль стилей панели
 **/

interface IPanel {
    children: ReactNode;
}

const Panel = ({ children }: IPanel) => {
    return <div className={styles.panel}>{children}</div>;
};

export default Panel;
