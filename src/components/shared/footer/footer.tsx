import { SITE_DOMAIN, SITE_YOB } from "../../../declarations/constants";

import FooterUI from "./footerUI";

/**
 * Компонент подвала приложения
 *
 * @param {IFooter} props - Свойства компонента:
 * @param {string} siteName - Название сайта/приложения
 *
 * @returns {JSX.Element} Футер с информацией о копирайте
 *
 * @description Компонент представляет собой футер сайта, отображающий информацию о копирайте,
 * названии приложения и периоде работы сайта
 */

interface IFooter {
    siteName: string;
    children?: React.ReactNode;
}

const Footer = ({ siteName, children }: IFooter) => {
    // Получаем текущий год
    const currYear = new Date().getFullYear().toString(10);

    // Формируем строку с периодом работы сайта
    const yearString = currYear === SITE_YOB ? SITE_YOB : SITE_YOB + " - " + currYear;

    return <FooterUI dob={yearString} appName={siteName} domain={SITE_DOMAIN} children={children}></FooterUI>;
};

export default Footer;
