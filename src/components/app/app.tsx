import { FC, useEffect } from "react";

import { BrowserRouter } from "react-router-dom";

import AppRouter from "../app-router/app-router";
import storeApi from "../../store/storeApi/storeApi";
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
const App: FC = () => {
    // Получаем методы API для загрузки данных
    const { fetchTasks, getNews } = storeApi();

    // Получаем методы установки данных в хранилища
    const setNews = storeNews((state) => state.setNews);
    const setTasks = storeTasks((state) => state.setTasks);
    const setLoading = storeApi((state) => state.setLoading);

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
        Promise.all([getNews(), fetchTasks()])
            .then(([news, tasks]) => {
                setNews(news);
                setTasks(tasks);
            })
            .then(() => setLoading(false));
    }, []);

    return (
        <BrowserRouter>
            <AppRouter />
        </BrowserRouter>
    );
};

export default App;
