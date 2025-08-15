import { FC } from "react";
import IPageSidebar from "./page-block.interface";
import PageBlockUI from "../ui/page-block/page-block";

/**
 * @component Функциональный компонент информационного блока страницы
 * 
 * @param {Object} IPageSidebar - Интерфейс пропсов компонента информационного блока
 * @param {string} title - Заголовок информационного блока
 * @param {ReactNode} children - Вложенные элементы с контентом блока
 * 
 * @returns {JSX.Element} Визуализированный компонент информационного блока с контентом
 * 
 * @description Компонент представляет собой контейнер для отображения информационного блока
 * с заголовком и содержимым на странице приложения
 */
const PageBlock: FC<IPageSidebar> = ({ title, children }) => (
    <PageBlockUI title={title}>{children}</PageBlockUI>
)

export default PageBlock;