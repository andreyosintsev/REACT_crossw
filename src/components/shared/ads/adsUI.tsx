import { ReactNode } from "react";

import styles from "./adsUI.module.scss";

/**
 * @component Визуальный компонент рекламного блока страницы
 *
 * @param {Object} IAds - Интерфейс пропсов компонента рекламного блока
 * @param {ReactNode} children - Вложенный рекламный контент
 *
 * @returns {JSX.Element} Визуализированный компонент рекламного блока
 *
 * @description Базовый UI-компонент, предназначенный для отображения
 * рекламного контента на странице приложения
 */

interface IAdsUI {
    children: ReactNode;
}

const AdsUI = ({ children }: IAdsUI) => {
    return <div className={styles.ads}>{children}</div>;
};

export default AdsUI;
