import { FC, useCallback, useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import AppHeader from "../app-header/app-header";
import AppWrapper from "../app-wrapper/app-wrapper";
import AppFooter from "../app-footer/app-footer";
import PageAds from "../page-ads/page-ads";

import AppSidebar from "../app-sidebar/app-sidebar";

import { SITE_NAME } from "../../declarations/constants";

import Home from "../../pages/home/home";
import Game from "../../pages/game/game";
import ModalButton from "../modal-button/modal-button";
import Modal from "../modal/modal";
import Preloader from "../preloader/preloader";
import { useStoreTask } from "../../services/useStoreTask/useStoreTask";

/**
 * @component Основной роутер приложения с обработкой состояний загрузки
 * @returns {JSX.Element} Маршрутизатор приложения с обработкой ошибок
 * 
 * @description
 * Компонент реализует:
 * - Маршрутизацию между страницами приложения
 * - Обработку состояний загрузки и ошибок
 * - Отображение прелоадера во время загрузки
 * - Модальное окно для ошибок с возможностью перезагрузки
 * - Основную структуру layout (header, content, sidebar, footer)
 */
const AppRouter: FC = () => {
    // Получаем состояние загрузки и ошибки из хранилища задач
    const { isLoading, error, clearError, fetchTasks } = useStoreTask();

    const navigate = useNavigate();

    // Состояние видимости модального окна ошибки
    const [isModalShow, setModalShow] = useState(false);

    /**
     * Обрабатывает закрытие модального окна с ошибкой
     * @param {React.MouseEvent} e - Событие клика
     * @returns {void}
     * 
     * @description
     * Закрывает модальное окно и повторяет попытку загрузки задачи
     * 
     * @memorized Использует useCallback для оптимизации
     */
    const closeHandler = useCallback(
        (e: React.MouseEvent) => {
            e.preventDefault();
            setModalShow(false);
        },
        []
    );

    /**
     * Эффект управления отображением модального окна ошибки
     * @dependency [error, setModalShow] - Зависит от наличия ошибки
     * 
     * @description
     * Автоматически показывает модальное окно при возникновении ошибки
     */
    useEffect(() => {
        setModalShow(!!error)
    }, [setModalShow, error])


    return (
        <>
            {isLoading && <Preloader />}
            <>
                <AppHeader siteName={SITE_NAME} />
                <AppWrapper>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/game/:taskNumber" element={<Game />} />
                    </Routes>

                    <AppSidebar>
                        <PageAds />
                    </AppSidebar>
                </AppWrapper>
                <AppFooter siteName={SITE_NAME} />
            </>
            {isModalShow && (
                <Modal
                    image="modal1.png"
                    title='Ошибка загрузки кроссворда.'
                    onClick={closeHandler}
                >
                    <ModalButton onClick={() => { navigate('/'); clearError(); }}>
                        На главную
                    </ModalButton>
                </Modal>
            )}
        </>
    );
};

export default AppRouter;
