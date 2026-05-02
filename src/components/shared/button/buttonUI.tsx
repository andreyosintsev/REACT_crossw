import IButton from "./button.interface";

import styles from "./buttonUI.module.scss";

/**
 * @component Визуальный компонент кнопки модального окна
 *
 * @param {Object} IButton - Интерфейс пропсов компонента кнопки
 * @param {Function} onClick - Обработчик клика по кнопке
 * @param {ReactNode} children - Текст или контент кнопки
 *
 * @returns {JSX.Element} Визуализированный компонент кнопки
 *
 * @description Базовый UI-компонент, представляющий собой кнопку
 * для выполнения действий внутри модального окна
 */
const ButtonUI = ({ onClick, children }: IButton) => {
    return (
        <div className={styles.button}>
            <button onClick={onClick}>{children}</button>
        </div>
    );
};

export default ButtonUI;
