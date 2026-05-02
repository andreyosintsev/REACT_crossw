import IWrapper from "./wrapper.interface";

import styles from "./wrapperUI.module.scss";

/**
 * @component Визуальный компонент обёртки приложения
 *
 * @param {Object} IWrapper - Интерфейс пропсов визуального компонента обёртки
 * @param {ReactNode} children - Вложенный контент приложения
 *
 * @returns {JSX.Element} Визуализированный компонент-обёртка с контентом
 *
 * @description Базовый UI-компонент, который служит корневым контейнером
 * для всего содержимого приложения, обеспечивая базовую структуру макета
 */
const WrapperUI = ({ children }: IWrapper) => {
    return <div className={styles.wrapper}>{children}</div>;
};

export default WrapperUI;
