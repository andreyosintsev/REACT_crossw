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
import { useStoreTask } from "../../services/useStoreTask/useStoreTask";
import { ITask } from "../../utils/api/api.interface";

/**
 * @component Компонент страницы игры в японский кроссворд
 * @returns {JSX.Element} Страница игры с полным функционалом
 * 
 * @description
 * Компонент реализует основную игровую страницу с:
 * - Загрузкой и отображением конкретного кроссворда
 * - Управлением игровым процессом (перезапуск, подсказки)
 * - Боковой панелью со списком доступных задач
 * - Обработкой пользовательских действий
 */
const Game: FC = () => {
    // Получаем методы и состояние из хранилища задач
    const { getTaskById, error, fetchTask } = useStoreTask();

    const [task, setTask] = useState<ITask | null>(null)

    // Состояние текущей подсказки
    const [isHelp, setHelp] = useState<IHelp>({
        content: '',
        xCoord: 0,
        yCoord: 0,
        position: null
    });

    // Получаем номер задачи из параметров URL
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
            setTask(getTaskById(taskId));
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
        const data = getTaskById(taskId);
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

    /**
     * Эффект загрузки задачи при изменении taskId
     * @dependency [taskId, getTaskById, fetchTask, setTask] - Зависимости эффекта
     * 
     * @description
     * Выполняет загрузку задачи при монтировании компонента или изменении taskId:
     * 1. Проверяет наличие задачи в кэше (через getTaskById)
     * 2. Если задача найдена в кэше - использует ее
     * 3. Если задача не найдена - загружает через API (fetchTask)
     * 4. Обновляет состояние задачи (setTask)
     */
    useEffect(() => {
        const loadTask = () => {
            const existingTask = getTaskById(taskId);
            if (existingTask) {
                setTask(existingTask);
            } else {
                fetchTask(taskId).then(setTask).catch(console.error);
            }
        };

        loadTask();
    }, [taskId, getTaskById, fetchTask, setTask]);

    return (
        <>
            <aside>
                <Tasks /> {/* Здеся будет ваша реклама */}
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
