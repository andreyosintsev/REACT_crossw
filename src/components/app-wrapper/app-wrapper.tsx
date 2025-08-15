import { FC } from "react";

import IAppWrapper from "./app-wrapper.interface";

import AppWrapperUI from "../ui/app-wrapper/app-wrapper";

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
const AppWrapper: FC<IAppWrapper> = ({ children }) => {
    return <AppWrapperUI>{children}</AppWrapperUI>
};

export default AppWrapper;
