import { useState, useEffect, useCallback, FC } from "react";
import { useParams } from "react-router-dom";

import AppStyles from "./game.module.scss";

import PageBlock from "../../components/page-block/page-block";
import Table from "./table/table";
import Controls from "./controls/controls";

import {
    clearBoardInLocalStorage,
} from "../../utils/local-storage/local-storage";
import { IHelp } from "./board/board.interface";
import Tasks from "./tasks/tasks";
import { useTaskStore } from "../../components/services/storeTask";

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
    const { task, setTask, getTaskById, error } = useTaskStore();

    const [isHelp, setHelp] = useState<IHelp>({
        content: '',
        xCoord: 0,
        yCoord: 0,
        position: null
    });

    const { taskNumber } = useParams();
    const taskId = taskNumber ? parseInt(taskNumber, 10) : 0;



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
            if (!taskId || taskId <= 0) return;
            clearBoardInLocalStorage(taskId);
            setHelp({
                content: '',
                xCoord: 0,
                yCoord: 0,
                position: null
            });
            setTask(getTaskById(`${taskId}`));
        },
        [getTaskById, taskId, setTask]
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
        const data = getTaskById(`${taskId}`);
        if (!data) return
        let help: IHelp = {
            content: '',
            xCoord: 0,
            yCoord: 0,
            position: null
        };
        let pos = 0;
        if (!(data)) {
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
    }, [getTaskById, taskId]);

    useEffect(() => {
        setTask(getTaskById(`${taskId}`));
    }, [taskId, getTaskById, setTask, error]);

    return (
        <>
            <aside>
                <Tasks />
            </aside>
            <main className={AppStyles.main}>
                {!error && task && (
                    <PageBlock title={"Кроссворд № " + taskId}>
                        <Table task={task} help={isHelp} />
                        <Controls
                            onRestart={restartHandler}
                            onHelp={helpHandler}
                        />
                    </PageBlock>
                )}
            </main>
        </>
    );
};

export default Game;
