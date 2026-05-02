import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";

import { fetchNews, fetchTasks } from "../../utils/api/apiService";

import Router from "../router/router";

import storeApp from "../../store/storeApp/storeApp";
import storeNews from "../../store/storeNews/storeNews";
import storeTasks from "../../store/storeTasks/storeTasks";

/**
 * Корневой компонент приложения
 *
 * @component
 * @returns {JSX.Element} Основной компонент приложения с провайдерами и инициализацией
 *
 * @description
 * Главный компонент приложения, который выполняет:
 * - Инициализацию данных приложения (новости и задачи)
 * - Обертку в необходимые провайдеры (React Router)
 * - Управление состоянием загрузки начальных данных
 * - Координацию работы всех хранилищ Zustand
 *
 * @lifecycle
 * 1. Монтирование → Загрузка данных
 * 2. Успешная загрузка → Рендеринг приложения
 * 3. Ошибка загрузки → Обработка ошибок (через дочерние компоненты)
 *
 * @example
 * // Точка входа в приложение
 * ReactDOM.render(<App />, document.getElementById('root'));
 */
const App = () => {
    // Получаем методы установки данных в хранилища
    const setNews = storeNews((state) => state.setNews);
    const setTasks = storeTasks((state) => state.setTasks);
    const setLoading = storeApp((state) => state.setLoading);
    const setError = storeApp((state) => state.setError);

    const isMenuMobileOpen = storeApp((state) => state.isMenuMobileOpen);

    /**
     * Эффект инициализации приложения
     * @dependency [] - Запускается единожды при монтировании
     *
     * @description
     * Выполняет первоначальную загрузку данных при запуске приложения:
     * 1. Устанавливает состояние загрузки
     * 2. Параллельно загружает новости и задачи через API
     * 3. Сохраняет данные в соответствующие хранилища
     * 4. Снимает состояние загрузки
     *
     * @strategy
     * Использует Promise.all для параллельной загрузки данных
     * что значительно ускоряет начальную инициализацию приложения
     *
     * @errorHandling
     * Ошибки обрабатываются в дочерних компонентах через хранилища
     */
    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            setError(null);

            try {
                const [news, tasks] = await Promise.all([fetchNews(), fetchTasks()]);

                setNews(news);
                setTasks(tasks);
            } catch (error: unknown) {
                const message = error instanceof Error ? error.message : "App.tsx: Failed to initialize application";

                setError(message);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [setNews, setTasks, setLoading, setError]);

    //Отключение скроллинга при открытии меню
    useEffect(() => {
        if (isMenuMobileOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isMenuMobileOpen]);

    return (
        <BrowserRouter>
            <Router />
        </BrowserRouter>
    );
};

export default App;
