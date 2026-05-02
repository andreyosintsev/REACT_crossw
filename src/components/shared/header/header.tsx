import { SITE_LOGO, SITE_MENU_MAIN } from "../../../declarations/constants";

import HeaderUI from "./headerUI";

/**
 * @component Функциональный компонент шапки приложения
 * @param {IHeader} props - Пропсы компонента
 * @param {string} props.siteName - Название сайта
 * @returns {JSX.Element} Визуальный компонент шапки приложения
 *
 * @description Компонент представляет собой шапку приложения, которая отображает название сайта, логотип и основное меню
 */

interface IHeader {
    siteName: string;
}

const Header = ({ siteName }: IHeader) => {
    return <HeaderUI siteName={siteName} logo={SITE_LOGO} menuItems={SITE_MENU_MAIN}></HeaderUI>;
};

export default Header;
