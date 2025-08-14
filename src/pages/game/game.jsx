import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";

import AppStyles from "./game.module.scss";

import Modal from "../../components/modal/modal";
import Preloader from "../../components/ui/preloader/preloader";
import PageBlock from "../../components/page-block/page-block";
import Table from "./table/table";
import Controls from "./controls/controls";
import ModalButton from "../../components/modal-button/modal-button";
import Tasks from "./tasks/tasks";

import { apiGetTask, apiGetTasks } from "../../utils/api/api";

import {
    loadTaskFromLocalStorage,
    saveTaskToLocalStorage,
    saveTasksToLocalStorage,
    clearTaskInLocalStorage,
    clearBoardInLocalStorage,
} from "../../utils/local-storage/local-storage";

/**
 * Компонент игры кроссвордов
 */
const Game = () => {
    // Текущая задача и номер задачи
    const [task, setTask] = useState(null);

    // Состояние загрузки задачи
    const [taskLoading, setTaskLoading] = useState({
        isLoading: true,
        hasError: false,
    });

    // Состояние загрузки списка задач
    const [, setTasksLoading] = useState({
        isLoading: true,
        hasError: false,
    });

    // Состояния отображения модальных окон
    const [isModalShow, setModalShow] = useState(false);
    const [isRestart, setRestart] = useState(false);
    const [isHelp, setHelp] = useState(false);

    const { taskNumber } = useParams();

    /**
     * Загрузка списка всех задач
     */
    const loadTasks = useCallback(() => {
        console.log("In loadTasks");
        try {
            apiGetTasks("")
                .then((data) => {
                    console.log("In loadTasks: then");
                    console.log("APP loadTasks: tasks loaded");
                    saveTasksToLocalStorage(data);
                    console.log("In loadTasks: saved to localStorage");
                    setTasksLoading({
                        isLoading: false,
                        hasError: false,
                        isLoaded: true,
                    });
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
            console.log("In loadTasks: catch error");
            console.error(`Не удалось получить tasks от API: ${error.message}`);
            setTasksLoading({
                isLoading: false,
                hasError: true,
                isLoaded: false,
            });
            setModalShow(true);
        }
    }, []);

    /**
     * Загрузка конкретной задачи
     * @param taskNumber номер задачи
     */
    const loadTask = useCallback((taskNumber) => {
        console.log("In loadTask");

        try {
            apiGetTask(taskNumber)
                .then((data) => {
                    console.log("GAME: loadTask: then");
                    console.log("GAME: loadTask: task loaded");
                    saveTaskToLocalStorage(taskNumber, data);
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
            console.log("GAME: loadTask: catch error");
            console.error(
                `GAME: Не удалось получить task от API: ${error.message}`
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
     * Обработчик закрытия модального окна
     * @param e событие клика
     */
    const closeHandler = useCallback(
        (e) => {
            e.preventDefault();
            setModalShow(false);
            setTaskLoading({
                isLoading: true,
                hasError: false,
                isLoaded: false,
            });
            loadTask();
        },
        [loadTask]
    );

    /**
     * Обработчик перезапуска игры
     * @param e событие клика
     */
    const restartHandler = useCallback(
        (e) => {
            clearBoardInLocalStorage(taskNumber);
            clearTaskInLocalStorage();
            setHelp(false);
            setTaskLoading({
                isLoading: true,
                hasError: false,
                isLoaded: true,
            });
            loadTask(taskNumber);
            loadTasks();
            setRestart(true);
        },
        [taskNumber, loadTask, loadTasks]
    );

    useEffect(() => {
        console.log("GAME: REDRAW!!");
        console.log("GAME: taskNumber: " + taskNumber);

        const storedTask = loadTaskFromLocalStorage(taskNumber);
        setTask(storedTask);

        if (!storedTask) {
            console.log("GAME: No Task In LocalStorage, loading");
            setTaskLoading({
                isLoading: true,
                hasError: false,
                isLoaded: false,
            });
            loadTask(taskNumber);
        } else {
            console.log("GAME: Task In LocalStorage, can play");
            setTaskLoading({
                isLoading: false,
                hasError: false,
                isLoaded: true,
            });
        }
        // if (!loadTasksFromLocalStorage()) {
        //   setTasksLoading({ isLoading: true, hasError: false, isLoaded: false });
        //   loadTasks(10);
        // } else {
        //   setTasksLoading({ isLoading: false, hasError: false, isLoaded: true });
        // }
        setRestart(false);
    }, [taskNumber, isRestart, loadTask, loadTasks]);

    /**
     * Обработчик подсказки
     *
     * Передается в качестве пропса в компонент Controls - оборачиваем в useCallback
     */
    const helpHandler = useCallback(() => {
        const data = loadTaskFromLocalStorage(taskNumber);
        let help = {};
        let pos = 0;
        if (!(data || data.task)) {
            return;
        }
        while (true) {
            pos = Math.floor(Math.random() * data.task.length);
            if (data.task[pos] === "1") {
                break;
            }
        }
        help.content = data.task[pos];
        help.pos = pos;
        help.x = pos % 5;
        setHelp(help);
    }, [taskNumber]);

    return (
        <>
            <aside>
                <Tasks />
            </aside>
            <main className={AppStyles.main}>
                {!taskLoading.isLoading && !taskLoading.hasError && task && (
                    <PageBlock title={"Кроссворд № " + taskNumber}>
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
