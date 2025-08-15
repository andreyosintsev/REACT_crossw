import ReactDOM from "react-dom";
import ModalUI from "../ui/modal/modal";
import IModal from "./modal.interface";
import { FC } from "react";

/**
 * @component Функциональный компонент модального окна
 * 
 * @param {Object} IModal - Интерфейс пропсов компонента модального окна
 * @param {string} title - Заголовок модального окна
 * @param {string} image - URL изображения для модального окна
 * @param {Function} onClick - Обработчик клика для закрытия модального окна
 * @param {ReactNode} children - Вложенный контент модального окна
 * 
 * @returns {JSX.Element | void} Визуализированный компонент модального окна или undefined
 * 
 * @description Компонент отвечает за отображение модальных окон в приложении. 
 * Использует React Portals для корректного позиционирования модальных окон
 */
const Modal: FC<IModal> = ({ title, image, onClick, children }) => {
    const modalRoot = document.querySelector("#modals");

    if (!modalRoot) return null;

    return ReactDOM.createPortal(
        <ModalUI title={title} image={image} onClick={onClick}>
            {children}
        </ModalUI>,
        modalRoot
    );
};

export default Modal;
