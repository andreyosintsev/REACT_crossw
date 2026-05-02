import BackdropUI from "./backdropUI";
import IBackdrop from "./backdrop.interface";

/**
 * @component Функциональный компонент подложки модального окна
 *
 * @param {Object} IBackdrop - Интерфейс пропсов компонента подложки
 * @param {Function} onClick - Обработчик клика для закрытия модального окна
 *
 * @returns {JSX.Element} Визуализированный компонент подложки модального окна
 *
 * @description Компонент представляет собой затемняющую подложку, которая отображается
 * при открытии модального окна и обеспечивает закрытие модального окна при клике
 */
const ModalBackdrop = ({ onClick }: IBackdrop) => {
    return <BackdropUI onClick={onClick} />;
};

export default ModalBackdrop;
