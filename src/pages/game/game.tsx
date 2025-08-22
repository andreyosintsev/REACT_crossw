import { useState, useEffect, useCallback, FC, useLayoutEffect } from "react";
import { useParams } from "react-router-dom";

import AppStyles from "./game.module.scss";

import Modal from "../../components/modal/modal";
import Preloader from "../../components/ui/preloader/preloader";
import PageBlock from "../../components/page-block/page-block";
import Table from "./table/table";
import Controls from "./controls/controls";
import ModalButton from "../../components/modal-button/modal-button";

import { apiGetTask, apiGetTasks, getErrorMessage } from "../../utils/api/api";

import {
    loadTaskFromLocalStorage,
    saveTaskToLocalStorage,
    saveTasksToLocalStorage,
    clearTaskInLocalStorage,
    clearBoardInLocalStorage,
} from "../../utils/local-storage/local-storage";
import { IHelp } from "./board/board.interface";
import { ILoadingState } from "./game.interface";
import { ITask } from "../../utils/api/api.interface";
import Tasks from "./tasks/tasks";

/**
 * @component Основной компонент игры в японский кроссворд
 * @returns {JSX.Element} Страница игры с полным функционалом
 * 
 * @description
 * Компонент реализует полный цикл игры в японский кроссворд:
 * - Загрузку и управление состоянием задачи
 * - Обработку пользовательских действий (перезапуск, подсказки)
 * - Отображение игрового поля и управляющих элементов
 * - Обработку ошибок и состояний загрузки
 * 
 * @state
 * @property {ITask | null} task - Текущая задача кроссворда
 * @property {ILoadingState} taskLoading - Состояние загрузки задачи
 * @property {ILoadingState} tasksLoading - Состояние загрузки списка задач
 * @property {boolean} isModalShow - Видимость модального окна ошибки
 * @property {boolean} isRestart - Флаг перезапуска игры
 * @property {IHelp} isHelp - Объект подсказки
 */
const Game: FC = () => {
    // Текущая задача и номер задачи
    const [task, setTask] = useState<ITask | null>();
    const [num, setNum] = useState(0);

    // Состояние загрузки задачи
    const [taskLoading, setTaskLoading] = useState<ILoadingState>({
        isLoading: true,
        hasError: false,
    });

    // Состояние загрузки списка задач
    const [, setTasksLoading] = useState<ILoadingState>({
        isLoading: true,
        hasError: false,
        isLoaded: false
    });

    // Состояния отображения модальных окон
    const [isModalShow, setModalShow] = useState(false);
    const [isRestart, setRestart] = useState(false);
    const [isHelp, setHelp] = useState<IHelp>({
        content: '',
        xCoord: 0,
        yCoord: 0,
        position: null
    });

    const { taskNumber } = useParams();
    const taskId = taskNumber ? parseInt(taskNumber, 10) : 0;

    /**
     * Загружает список всех задач с сервера
     * @returns {void}
     * 
     * @description
     * Выполняет асинхронный запрос к API для получения списка задач:
     * - Сохраняет задачи в localStorage для кэширования
     * - Обновляет состояние загрузки
     * - Обрабатывает ошибки запроса
     * 
     * @memorized Использует useCallback для оптимизации
     */
    const loadTasks = useCallback(() => {
        console.log("In loadTasks");
        try {
            apiGetTasks()
                .then((data) => {
                    console.log("In loadTasks: then");
                    console.log("APP loadTasks: tasks loaded");
                    const { success, ...newData } = data
                    saveTasksToLocalStorage(newData.tasks);
                    console.log("In loadTasks: saved to localStorage");
                    setTasksLoading({
                        isLoading: false,
                        hasError: false,
                        isLoaded: true,
                    });
                    setNum(num + 1)
                })
                .catch((error) => {
                    console.log("In loadTasks: error");
                    console.error(`Ошибка Promise: ${error}`);
                    setTasksLoading({
                        isLoading: false,
                        hasError: true,
                        isLoaded: false,
                    });
                    setModalShow(true);
                });
        } catch (error) {
            const errorMessage = getErrorMessage(error);
            console.log("In loadTasks: catch error");
            console.error(`Не удалось получить tasks от API: ${errorMessage}`);
            setTasksLoading({
                isLoading: false,
                hasError: true,
                isLoaded: false,
            });
            setModalShow(true);
        }
    }, []);

    /**
     * Загружает конкретную задачу по ID
     * @param {number} taskId - Номер задачи для загрузки
     * @returns {void}
     * 
     * @description
     * Выполняет асинхронный запрос к API для получения задачи:
     * - Сохраняет задачу в localStorage для кэширования
     * - Обновляет состояние текущей задачи
     * - Обрабатывает ошибки запроса
     * 
     * @memorized Использует useCallback для оптимизации
     */
    const loadTask = useCallback(async (taskId: number) => {
        console.log("In loadTask");
        try {
            apiGetTask(taskId)
                .then((data) => {
                    console.log("GAME: loadTask: then");
                    console.log("GAME: loadTask: task loaded");
                    const { success, ...newData } = data
                    saveTaskToLocalStorage(taskId, newData);
                    setTask(newData);
                    console.log("GAME: loadTask: saved to localStorage");
                    setTaskLoading({
                        isLoading: false,
                        hasError: false,
                        isLoaded: true,
                    });
                })
                .catch((error) => {
                    console.log("GAME: loadTask: error");
                    console.error(`GAME: Ошибка Promise: ${error}`);
                    setTaskLoading({
                        isLoading: false,
                        hasError: true,
                        isLoaded: false,
                    });
                    setModalShow(true);
                });
        } catch (error) {
            let errorMessage = getErrorMessage(error);
            console.log("GAME: loadTask: catch error");
            console.error(
                `GAME: Не удалось получить task от API: ${errorMessage}`
            );
            setTaskLoading({
                isLoading: false,
                hasError: true,
                isLoaded: false,
            });
            setModalShow(true);
        }
    }, []);

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
            if (taskId) {
                setTaskLoading({
                    isLoading: true,
                    hasError: false,
                    isLoaded: false,
                });
                loadTask(taskId);
            }
        },
        [loadTask, taskId]
    );

    /**
     * Обрабатывает перезапуск текущей игры
     * @param {React.MouseEvent} e - Событие клика
     * @returns {void}
     * 
     * @description
     * Выполняет полный сброс состояния игры:
     * - Очищает сохраненное состояние из localStorage
     * - Сбрасывает подсказки
     * - Перезагружает задачу
     * - Обновляет список задач
     * 
     * @memorized Использует useCallback для оптимизации
     */
    const restartHandler = useCallback(
        (e: React.MouseEvent) => {
            e.preventDefault();
            if (!taskId) return;
            clearBoardInLocalStorage(taskId);
            clearTaskInLocalStorage(taskId);
            setHelp({
                content: '',
                xCoord: 0,
                yCoord: 0,
                position: null
            });
            setTaskLoading({
                isLoading: true,
                hasError: false,
                isLoaded: false,
            });
            setRestart(true);
            loadTask(taskId);
            loadTasks();

        },
        [taskId, loadTask, loadTasks]
    );


    /**
     * Генерирует случайную подсказку для игрока
     * @returns {void}
     * 
     * @description
     * Выбирает случайную закрашенную клетку из решения:
     * - Ищет клетку со значением "1" в эталонном решении
     * - Устанавливает позицию и содержание подсказки
     * - Передает подсказку в игровое поле
     * 
     * @memorized Использует useCallback для оптимизации
    */
    const helpHandler = useCallback(() => {
        if (!taskId) return
        const data = loadTaskFromLocalStorage(taskId);
        if (!data) return
        let help: IHelp = {
            content: '',
            xCoord: 0,
            yCoord: 0,
            position: null
        };
        let pos = 0;
        if (!(data || data)) {
            return;
        }
        while (true) {
            pos = Math.floor(Math.random() * data.task.length);
            if (data.task[pos] === "1") {
                break;
            }
        }
        help.content = data.task[pos];
        help.position = pos;
        help.xCoord = pos % 5;
        setHelp(help);
    }, [taskId]);

    /**
     * Эффект инициализации и загрузки игры
     * @dependency [taskId, isRestart, loadTask] - Зависит от параметров игры
     */
    useEffect(() => {
        if (!taskId) return;
        console.log("GAME: REDRAW!!");
        console.log("GAME: taskNumber: " + taskId);

        const storedTask = loadTaskFromLocalStorage(taskId);
        setTask(storedTask);

        if (!storedTask) {
            console.log("GAME: No Task In LocalStorage, loading");
            setTaskLoading({
                isLoading: true,
                hasError: false,
                isLoaded: false,
            });
            loadTask(taskId)
        } else {
            console.log("GAME: Task In LocalStorage, can play");
            setTaskLoading({
                isLoading: false,
                hasError: false,
                isLoaded: true,
            });
        }
        setRestart(false);
    }, [taskId, loadTask, setTask]);

    return (
        <>
            <aside>
                <Tasks />
            </aside>
            <main className={AppStyles.main}>
                {!taskLoading.isLoading && !taskLoading.hasError && task && (
                    <PageBlock title={"Кроссворд № " + taskId}>
                        <Table task={task} help={isHelp} />
                        <Controls
                            onRestart={restartHandler}
                            onHelp={helpHandler}
                        />
                    </PageBlock>
                )}
                {taskLoading.isLoading && <Preloader />}
                {taskLoading.hasError && isModalShow && (
                    <Modal
                        image="modal1.png"
                        title="Ошибка загрузки кроссворда."
                        onClick={closeHandler}
                    >
                        <ModalButton onClick={closeHandler}>
                            Закрыть
                        </ModalButton>
                    </Modal>
                )}
            </main>
        </>
    );
};

export default Game;
