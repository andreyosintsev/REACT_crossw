import cn from "classnames";

import IButton from "./button.interface";

import styles from "./buttonUI.module.scss";

/**
 * @component Визуальный компонент кнопки
 *
 * @param {Object} IButton - Интерфейс пропсов компонента кнопки
 * @param {string} className - Имя дополнительного класса кнопки
 * @param {Function} onClick - Обработчик клика по кнопке
 * @param {ReactNode} children - Текст или контент кнопки
 *
 * @returns {JSX.Element} Визуализированный компонент кнопки
 *
 * @description Базовый UI-компонент, представляющий собой кнопку
 * для выполнения действий внутри модального окна
 */
const ButtonUI = ({ className, onClick, children }: IButton) => {
    return (
        <button className={cn(styles.button, className)} onClick={onClick}>
            {children}
        </button>
    );
};

export default ButtonUI;
