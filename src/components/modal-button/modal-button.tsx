import { FC } from "react";
import IModalButton from "./modal-button.interface";
import ModalButtonUI from "../ui/modal-button/modal-button";

/**
 * @component Функциональный компонент кнопки для модального окна
 * 
 * @param {Object} IModalButton - Интерфейс пропсов компонента кнопки
 * @param {Function} onClick - Обработчик клика по кнопке
 * @param {ReactNode} children - Текст или контент, отображаемый на кнопке
 * 
 * @returns {JSX.Element} Визуализированный компонент кнопки модального окна
 * 
 * @description Компонент представляет собой кнопку, которая используется внутри модальных окон
 * для выполнения различных действий (подтверждение, отмена и т.д.)
 */
const ModalButton: FC<IModalButton> = ({ onClick, children }) => (
    <ModalButtonUI onClick={onClick}>{children}</ModalButtonUI>
)
export default ModalButton;
