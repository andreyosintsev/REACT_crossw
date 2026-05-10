import { FC, useCallback, useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

import { SITE_MENU_MAIN, SITE_NAME } from "../../declarations/constants";

import Header from "../shared/header/header";
import Wrapper from "../shared/wrapper/wrapper";
import Sidebar from "../shared/sidebar/sidebar";
import Ads from "../shared/ads/ads";
import MenuMobile from "../shared/menu-mobile/menu-mobile";
import Footer from "../shared/footer/footer";

import Home from "../../pages/home/home";
import Game from "../../pages/game/game";
import Modal from "../shared/modal/modal";
import ModalButton from "../shared/button/button";
import Preloader from "../shared/preloader/preloader";
import Backdrop from "../shared/backdrop/backdrop";

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
const Router: FC = () => {
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
            {isLoading && <Preloader image="/images/preloader.gif" />}
            {tasks && !isLoading && !error && (
                <>
                    <Header siteName={SITE_NAME} />
                    <MenuMobile menuItems={SITE_MENU_MAIN} title={SITE_NAME} />
                    <Wrapper>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/game/:taskNumber" element={<Game />} />
                            <Route path="*" element={<Navigate to="/" replace />} />
                        </Routes>

                        <Sidebar>
                            <Ads>
                                <img src="/images/banner-300x800.png" alt="Реклама" />
                            </Ads>
                        </Sidebar>
                    </Wrapper>
                    <Footer siteName={SITE_NAME}>
                        <img src="/images/banner-320x50.jpg" alt="Реклама" />
                    </Footer>
                </>
            )}
            {isModalShow && (
                <Modal image="modal1.png" title={error ? `Ошибка загрузки кроссворда: ${error}` : "Ошибка загрузки кроссворда"}>
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
            <Backdrop />
        </>
    );
};

export default Router;
