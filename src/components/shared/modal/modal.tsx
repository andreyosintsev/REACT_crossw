import { createPortal } from "react-dom";

import IModal from "./modal.interface";
import ModalUI from "./modalUI";

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
const Modal = ({ title, image, children }: IModal) => {
    const modalRoot = document.getElementById("modals");

    if (!modalRoot) return null;

    return createPortal(
        <ModalUI title={title} image={image}>
            {children}
        </ModalUI>,
        modalRoot,
    );
};

export default Modal;
