import { useEffect, useLayoutEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Page from "../../components/shared/page/page";
import Block from "../../components/shared/block/block";
import Table from "../../components/game/table/table";
import Controls from "../../components/game/controls/controls";

import storeTasks from "../../store/storeTasks/storeTasks";
import storeGame from "../../store/storeGame/storeGame";
import storeUser from "../../store/storeUser/storeUser";
import storeApp from "../../store/storeApp/storeApp";
import storeLegend from "../../store/storeLegend/storeLegend";

import { loadCrosswordFromLocalStorage } from "../../utils/local-storage/local-storage";

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
const Game = () => {
    // Получаем методы и состояние из различных хранилищ Zustand

    /** Функция получения задачи по ID из хранилища задач */
    const getTaskById = storeTasks((state) => state.getTaskById);
    /** Текущая активная задача из игрового хранилища */
    const task = storeGame((state) => state.task);
    /** Функция установки текущей задачи */
    const setTask = storeGame((state) => state.setTask);
    /** Функция обработки перезапуска игры */
    const handleRestart = storeGame((state) => state.restartGame);
    /** Функция обработки подсказки */
    const handleHint = storeGame((state) => state.giveHint);
    /** Функция инициализации игрового процесса */
    const initializeGame = storeGame((state) => state.initializeGame);
    /** Сообщение об ошибке из API хранилища */
    const error = storeApp((state) => state.error);
    /** Функция получения информации о кроссворде пользователя */
    const getCrosswordById = storeUser((state) => state.getCrosswordById);
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
        const userTaskInfo = loadCrosswordFromLocalStorage(taskId) || getCrosswordById(taskId);
        // Устанавливаем задачу и информацию о выполнении
        setTask(getTaskById(taskId), userTaskInfo);
        // Инициализируем игровой процесс
        initializeGame();
    }, [getCrosswordById, getTaskById, initializeGame, setTask, taskId, navigate]);

    useLayoutEffect(() => {
        clearLegend();
    }, [taskId, clearLegend]);

    if (Number.isNaN(taskId)) {
        return null;
    }

    return (
        <Page>
            <Block>
                <Controls onRestart={handleRestart} onHelp={handleHint} />
            </Block>
            {!error && task && (
                <Block title={"Кроссворд " + taskId}>
                    <Table task={task} />
                </Block>
            )}
        </Page>
    );
};

export default Game;
