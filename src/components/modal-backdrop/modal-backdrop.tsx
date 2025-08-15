import { FC } from "react";
import ModalBackdropUI from "../ui/modal-backdrop/modal-backdrop";
import IModalBackdrop from "./modal-backdrop.interface";

/**
 * @component Функциональный компонент подложки модального окна
 * 
 * @param {Object} IModalBackdrop - Интерфейс пропсов компонента подложки
 * @param {Function} onClick - Обработчик клика для закрытия модального окна
 * 
 * @returns {JSX.Element} Визуализированный компонент подложки модального окна
 * 
 * @description Компонент представляет собой затемняющую подложку, которая отображается
 * при открытии модального окна и обеспечивает закрытие модального окна при клике
 */
const ModalBackdrop: FC<IModalBackdrop> = ({ onClick }: IModalBackdrop) => {
    return (
        <ModalBackdropUI onClick={onClick} />
    );
};

export default ModalBackdrop;
