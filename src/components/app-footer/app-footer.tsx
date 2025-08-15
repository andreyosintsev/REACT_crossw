import { FC } from "react";

import { SITE_DOMAIN, SITE_YOB } from "../../declarations/constants";

import IAppFooter from "./app-footer.interface";
import AppFooterUI from "../ui/app-footer/app-footer";

/**
 * Компонент подвала приложения
 * 
 * @param {IAppFooter} props - Свойства компонента:
 * @param {string} siteName - Название сайта/приложения
 * 
 * @returns {JSX.Element} Футер с информацией о копирайте
 * 
 * @description Компонент представляет собой футер сайта, отображающий информацию о копирайте,
 * названии приложения и периоде работы сайта
 */
const AppFooter: FC<IAppFooter> = ({ siteName }) => {
    // Получаем текущий год
    const currYear = new Date().getFullYear().toString(10);

    // Формируем строку с периодом работы сайта
    const yearString =
        currYear === SITE_YOB ? SITE_YOB : SITE_YOB + " - " + currYear;
    return <AppFooterUI initialReleaseYear={yearString} appName={siteName} domain={SITE_DOMAIN}></AppFooterUI>
};

export default AppFooter;
