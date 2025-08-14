import { FC } from "react";

import styles from "./app-wrapper.module.scss";
import IAppWrapper from "../../app-wrapper/app-wrapper.interface";

/**
 * @component Визуальный компонент обёртки приложения
 * 
 * @param {Object} IAppWrapper - Интерфейс пропсов визуального компонента обёртки
 * @param {ReactNode} children - Вложенный контент приложения
 * 
 * @returns {JSX.Element} Визуализированный компонент-обёртка с контентом
 * 
 * @description Базовый UI-компонент, который служит корневым контейнером
 * для всего содержимого приложения, обеспечивая базовую структуру макета
 */
const AppWrapperUI: FC<IAppWrapper> = ({ children }) => {
    return <div className={styles.wrapper}>{children}</div>;
};

export default AppWrapperUI;
