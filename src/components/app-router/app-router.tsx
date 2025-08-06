import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';

import AppHeader from  '../app-header/app-header';
import AppWrapper from '../app-wrapper/app-wrapper';
import AppFooter from  '../app-footer/app-footer';
import PageAds from '../page-ads/page-ads';


import AppSidebar from '../app-sidebar/app-sidebar';


import { SITE_NAME } from '../../declarations/constants';

import Home from '../../pages/home/home';
import Game from '../../pages/game/game';

/**
 * @component - основной роутер приложения
 * @returns {JSX.Element} - маршрутизатор приложения с основной структурой
 * 
 * @description
 * Компонент реализует:
 * - Базовую структуру приложения (шапка, контент, подвал)
 * - Маршрутизацию между страницами
 * - Распределение основного и бокового контента
 * - Передачу глобальных параметров (SITE_NAME)
 * 
 * @structure
 * 1. AppHeader - шапка сайта
 * 2. AppWrapper - основной контейнер
 *   - Routes - система маршрутов
 *   - AppSidebar - боковая панель
 * 3. AppFooter - подвал сайта
 * 
 * @routes
 * - '/' - Главная страница
 * - '/game/:taskNumber' - Страница игры
 * 
 * @see AppHeader - компонент шапки
 * @see AppWrapper - основной контейнер
 * @see AppSidebar - боковая панель
 * @see AppFooter - компонент подвала
 * @see Routes - система маршрутизации
 */
const AppRouter:FC = () => {
    return (
        <>
            <AppHeader siteName = { SITE_NAME } />
            <AppWrapper>

                <Routes>
                    <Route path = '/' element = { <Home /> } />
                    <Route path = '/game/:taskNumber' element = { <Game /> } />
                </Routes>

                <AppSidebar>
                    <PageAds />
                </AppSidebar>
            
            </AppWrapper>
            <AppFooter  siteName = { SITE_NAME } />
        </>
    )
}

export default AppRouter