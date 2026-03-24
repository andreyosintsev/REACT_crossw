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
import storeTasks from "../../store/storeTasks/storeTasks";
import storeApp from "../../store/storeApp/storeApp";

/**
 * Основной роутер приложения с обработкой состояний загрузки и ошибок
 *
 * @component
 * @returns {JSX.Element} Маршрутизатор приложения с полной структурой layout
 *
 * @description
 * Компонент реализует главный роутер приложения с:
 * - Обработкой состояний загрузки и ошибок
 * - Отображением прелоадера во время загрузки
 * - Модальным окном для ошибок с навигацией
 * - Основной структурой layout (header, content, sidebar, footer)
 * - Интеграцией со всеми необходимыми хранилищами Zustand
 *
 * @example
 * // Использование в корневом компоненте
 * ReactDOM.render(
 *   <BrowserRouter>
 *     <AppRouter />
 *   </BrowserRouter>,
 *   document.getElementById('root')
 * );
 */
const AppRouter: FC = () => {
    // Получаем состояние загрузки из хранилища
    const isLoading = storeApp((state) => state.isLoading);
    // Получаем состояние ошибки из хранилища
    const error = storeApp((state) => state.error);
    // Получаем метод сброса ошибки из хранилища
    const clearError = storeApp((state) => state.clearError);
    // Получаем список задач из хранилища задач
    const tasks = storeTasks((state) => state.tasks);
    // Хук для программной навигации
    const navigate = useNavigate();
    // Состояние видимости модального окна ошибки
    const [isModalShow, setModalShow] = useState(false);

    /**
     * Обрабатывает закрытие модального окна с ошибкой
     * @param {React.MouseEvent} e - Событие клика
     * @returns {void}
     *
     * @description
     * Закрывает модальное окно с ошибкой без дополнительных действий
     *
     * @memorized Использует useCallback для оптимизации ререндеров
     */
    const closeHandler = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        setModalShow(false);
    }, []);

    /**
     * Эффект управления отображением модального окна ошибки
     * @dependency [error] - Зависит от наличия ошибки
     *
     * @description
     * Автоматически показывает модальное окно при возникновении ошибки:
     * - Преобразует булево значение error в состояние видимости модалки
     * - Синхронизирует видимость модального окна с состоянием ошибки
     */
    useEffect(() => {
        setModalShow(!!error);
    }, [error]);

    return (
        <>
            {isLoading && <Preloader />}
            {tasks && !isLoading && !error && (
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
            )}
            {isModalShow && (
                <Modal
                    image="modal1.png"
                    title={error ? `Ошибка загрузки кроссворда: ${error}` : "Ошибка загрузки кроссворда"}
                    onClick={closeHandler}
                >
                    <ModalButton
                        onClick={() => {
                            navigate("/");
                            clearError();
                        }}
                    >
                        На главную
                    </ModalButton>
                </Modal>
            )}
        </>
    );
};

export default AppRouter;
