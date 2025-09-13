import { useEffect, FC } from "react";
import { useParams } from "react-router-dom";

import AppStyles from "./game.module.scss";

import PageBlock from "../../components/page-block/page-block";
import Table from "./table/table";
import Controls from "./controls/controls";

import Tasks from "./tasks/tasks";
import useStoreTask from "../../services/useStoreTask/useStoreTask";
import { gameStoreControl } from "../../services/gameStoreControl/gameStoreControl";
import userStore from "../../services/userStoreTask/userStore";
import { loadCrosswordBoardFromLocalStorage } from "../../utils/local-storage/local-storage";
import apiStore from "../../services/apiStore/apiStore";

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
    const getTaskById = useStoreTask(state => state.getTaskById);
    /** Текущая активная задача из игрового хранилища */
    const task = gameStoreControl(state => state.task);
    /** Функция установки текущей задачи */
    const setTask = gameStoreControl(state => state.setTask);
    /** Функция обработки перезапуска игры */
    const handleRestart = gameStoreControl(state => state.handleRestart);
    /** Функция обработки подсказки */
    const handleHelp = gameStoreControl(state => state.handleHelp);
    /** Функция инициализации игрового процесса */
    const initializeGame = gameStoreControl(state => state.initializeGame);
    /** Сообщение об ошибке из API хранилища */
    const error = apiStore(state => state.error);
    /** Функция получения информации о кроссворде пользователя */
    const { getCrosswordBoardById } = userStore();

    // Получаем номер задачи из параметров URL
    const { taskNumber } = useParams();
    const taskId = taskNumber ? parseInt(taskNumber, 10) : 0;

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
        // Загружаем информацию о выполнении задачи (из localStorage или хранилища пользователя)
        const userTaskInfo = loadCrosswordBoardFromLocalStorage(taskId) || getCrosswordBoardById(taskId)
        // Устанавливаем задачу и информацию о выполнении
        setTask(getTaskById(taskId), userTaskInfo);
        // Инициализируем игровой процесс
        initializeGame()
    }, [getCrosswordBoardById, getTaskById, initializeGame, setTask, taskId]);

    return (
        <>
            <aside>
                <Tasks /> {/* Здеся будет ваша реклама */}
            </aside>
            <main className={`${AppStyles.main}`}>
                {!error && task && (
                    <PageBlock title={"Кроссворд № " + taskId}>
                        <Table task={task} />
                        <Controls
                            onRestart={handleRestart}
                            onHelp={handleHelp}
                        />
                    </PageBlock>
                )}
            </main>
        </>
    );
};

export default Game