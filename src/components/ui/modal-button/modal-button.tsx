import { FC } from "react";
import IModalButton from "../../modal-button/modal-button.interface";
import styles from './modal-button.module.scss'

/**
 * @component Визуальный компонент кнопки модального окна
 * 
 * @param {Object} IModalButton - Интерфейс пропсов компонента кнопки
 * @param {Function} onClick - Обработчик клика по кнопке
 * @param {ReactNode} children - Текст или контент кнопки
 * 
 * @returns {JSX.Element} Визуализированный компонент кнопки
 * 
 * @description Базовый UI-компонент, представляющий собой кнопку
 * для выполнения действий внутри модального окна
 */
const ModalButtonUI: FC<IModalButton> = ({ onClick, children }) => {
    return (
        <div className={styles.button}>
            <button onClick={onClick}>{children}</button>
        </div>
    );
};

export default ModalButtonUI;
