import IWrapper from "./wrapper.interface";

import WrapperUI from "./wrapperUI";

/**
 * @component Функциональный компонент обёртки приложения
 *
 * @param {Object} IAppWrapper - Интерфейс пропсов компонента обёртки
 * @param {ReactNode} children - Вложенные элементы для отображения внутри обёртки
 *
 * @returns {JSX.Element} Визуализированный компонент обёртки с вложенным контентом
 *
 * @description Основной контейнер для обёртки приложения, который принимает вложенные элементы
 * через пропс children и обеспечивает базовую структуру макета
 */
const Wrapper = ({ children }: IWrapper) => {
    return <WrapperUI>{children}</WrapperUI>;
};

export default Wrapper;
