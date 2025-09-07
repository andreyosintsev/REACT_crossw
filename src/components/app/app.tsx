import { FC, useEffect } from "react";

import { BrowserRouter } from "react-router-dom";

import AppRouter from "../app-router/app-router";
import apiStore from "../../services/apiStore/apiStore";
import newsStore from "../../services/newsStore/newsStores";
import useStoreTask from "../../services/useStoreTask/useStoreTask";

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
    const { fetchTasks, getNews } = apiStore();

    // Получаем методы установки данных в хранилища
    const setNews = newsStore(state => state.setNews);
    const setTasks = useStoreTask(state => state.setTasks);
    const setLoading = apiStore(state => state.setLoading);

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
        setLoading(true)
        Promise.all([getNews(), fetchTasks()])
            .then(([news, tasks]) => {
                setNews(news);
                setTasks(tasks)
            })
            .then(() => setLoading(false));
    }, [])

    return (
        <BrowserRouter>
            <AppRouter />
        </BrowserRouter>
    );
};

export default App;
