import ModalBackdrop from "../../modal-backdrop/modal-backdrop";
import IModal from "./modal.interface";
import { FC } from "react";
import styles from './modal.module.scss'

/**
 * @component Визуальный компонент модального окна
 * @description Базовый UI-компонент, отвечающий за отображение модального окна
 * с контентом, заголовком и кнопками управления
 * 
 * @param {Object} IModal - Интерфейс пропсов визуального компонента модального окна
 * @param {string} title - Заголовок модального окна
 * @param {string} image - Имя файла изображения для модального окна
 * @param {Function} onClick - Обработчик клика для закрытия модального окна
 * @param {ReactNode} children - Вложенный контент (обычно кнопки)
 * 
 * @returns {JSX.Element} Визуализированный компонент модального окна
 */
const ModalUI: FC<IModal> = ({ title, image, onClick, children }) => (
    <>
        <ModalBackdrop onClick={onClick} />
        <div
            className={`${styles.modal}`}
            onClick={(e) => e.stopPropagation()}
        >
            <img src={`/imgs/${image}`} alt="picword" />
            <p>{title}</p>
            <div className={`${styles.buttons}`}>{children}</div>
        </div>
    </>
);

export default ModalUI;
