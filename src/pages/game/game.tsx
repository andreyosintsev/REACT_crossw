import { useEffect, useLayoutEffect, FC } from "react";
import { useParams, useNavigate } from "react-router-dom";

import AppStyles from "./game.module.scss";

import PageBlock from "../../components/page-block/page-block";
import Table from "./table/table";
import Controls from "./controls/controls";

import Tasks from "./tasks/tasks";
import storeTasks from "../../store/storeTasks/storeTasks";
import { storeGame } from "../../store/storeGame/storeGame";
import storeUser from "../../store/storeUser/storeUser";
import { loadCrosswordBoardFromLocalStorage } from "../../utils/local-storage/local-storage";
import storeApp from "../../store/storeApp/storeApp";
import storeLegend from "../../store/storeLegend/storeLegend";

/**
 * Компонент страницы игры в японский кроссворд
 *
 * @component
 * @returns {JSX.Element} Страница игры с полным функционалом
 *
 * @description
 * Основной компонент для отображения и управления игровым процессом:
 * - Загрузка и отображение конкретного кроссворда
 * - Управление игровым процессом (перезапуск, подсказки)
 * - Интеграция со всеми необходимыми хранилищами Zustand
 * - Обработка параметров URL для определения задачи
 *
 */
const Game: FC = () => {
    // Получаем методы и состояние из различных хранилищ Zustand

    /** Функция получения задачи по ID из хранилища задач */
    const getTaskById = storeTasks((state) => state.getTaskById);
    /** Текущая активная задача из игрового хранилища */
    const task = storeGame((state) => state.task);
    /** Функция установки текущей задачи */
    const setTask = storeGame((state) => state.setTask);
    /** Функция обработки перезапуска игры */
    const handleRestart = storeGame((state) => state.handleRestart);
    /** Функция обработки подсказки */
    const handleHelp = storeGame((state) => state.handleHelp);
    /** Функция инициализации игрового процесса */
    const initializeGame = storeGame((state) => state.initializeGame);
    /** Сообщение об ошибке из API хранилища */
    const error = storeApp((state) => state.error);
    /** Функция получения информации о кроссворде пользователя */
    const getCrosswordBoardById = storeUser((state) => state.getCrosswordBoardById);
    /** Функция очистки легенд из хранилища легенд */
    const clearLegend = storeLegend((state) => state.clearLegend);

    // Получаем метод навигации
    const navigate = useNavigate();

    // Получаем номер задачи из параметров URL
    const { taskNumber } = useParams<{ taskNumber: string }>();
    const taskId = Number(taskNumber);

    /**
     * Эффект загрузки и инициализации игры при монтировании компонента
     * @dependency [taskId, getTaskById, setTask, initializeGame, getCrosswordBoardById] - Зависимости эффекта
     *
     * @description
     * Выполняет последовательную инициализацию игрового процесса:
     * 1. Загружает информацию о выполнении задачи из localStorage или хранилища пользователя
     * 2. Получает объект задачи по ID из хранилища задач
     * 3. Устанавливает задачу и информацию о выполнении в игровое хранилище
     * 4. Инициализирует игровой процесс (создание поля и легенд)
     *
     * @logic
     * - Приоритет: localStorage → хранилище пользователя
     * - Автоматический запуск при изменении taskId
     * - Интеграция со всеми необходимыми хранилищами
     */
    useEffect(() => {
        // Если в адресной строке неверный номер задачи
        if (Number.isNaN(taskId)) {
            console.error("game.tsx: taskId is NaN");
            navigate("/");
            return;
        }

        const currentTask = getTaskById(taskId);

        if (!currentTask) {
            console.error(`game.tsx: task with id=${taskId} not found`);
            navigate("/");
            return;
        }

        // Загружаем информацию о выполнении задачи (из localStorage или хранилища пользователя)
        const userTaskInfo = loadCrosswordBoardFromLocalStorage(taskId) || getCrosswordBoardById(taskId);
        // Устанавливаем задачу и информацию о выполнении
        setTask(getTaskById(taskId), userTaskInfo);
        // Инициализируем игровой процесс
        initializeGame();
    }, [getCrosswordBoardById, getTaskById, initializeGame, setTask, taskId, navigate]);

    useLayoutEffect(() => {
        clearLegend();
    }, [taskId, clearLegend]);

    if (Number.isNaN(taskId)) {
        return null;
    }

    return (
        <>
            <aside>
                <Tasks /> {/* Здеся будет ваша реклама */}
            </aside>
            <main className={`${AppStyles.main}`}>
                {!error && task && (
                    <PageBlock title={"Кроссворд № " + taskId}>
                        <Table task={task} />
                        <Controls onRestart={handleRestart} onHelp={handleHelp} />
                    </PageBlock>
                )}
            </main>
        </>
    );
};

export default Game;
