import BackdropUI from "./backdropUI";

import storeApp from "../../../store/storeApp/storeApp";

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
const Backdrop = () => {
    const isMenuMobileOpen = storeApp((state) => state.isMenuMobileOpen);
    const isModalOpen = storeApp((state) => state.isModalOpen);
    const closeAll = storeApp((state) => state.closeAllOverlays);

    const isVisible = isMenuMobileOpen || isModalOpen;

    return <BackdropUI visible={isVisible} onClick={closeAll} />;
};

export default Backdrop;
