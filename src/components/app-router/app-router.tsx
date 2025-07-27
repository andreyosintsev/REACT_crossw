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