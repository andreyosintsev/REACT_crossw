import { FC } from "react";

import IAppHeader from "./app-header.interface";

import { SITE_LOGO } from "../../declarations/constants";
import { SITE_MENU_MAIN } from "../../declarations/constants";
import AppHeaderUI from "../ui/app-header/app-header";

/**
 * @component Функциональный компонент шапки приложения
 * @param {IAppHeader} props - Пропсы компонента
 * @param {string} props.siteName - Название сайта
 * @returns {JSX.Element} Визуальный компонент шапки приложения
 * 
 * @description Компонент представляет собой шапку приложения, которая отображает название сайта, логотип и основное меню
 */
const AppHeader: FC<IAppHeader> = ({ siteName }) => {
    return (<AppHeaderUI siteName={siteName} logo={SITE_LOGO} menuItems={SITE_MENU_MAIN}></AppHeaderUI>);
};

export default AppHeader;
