import { useState, useEffect, useCallback, FC } from "react";

import BoardZeroField from "../board-zero-field/board-zero-field";
import Board from "../board/board";
import LegendHorizontal from "../legend-horizontal/legend-horizontal";
import LegendVertical from "../legend-vertical/legend-vertical";
import Modal from "../../../components/modal/modal";
import ModalButton from "../../../components/modal-button/modal-button";

import styles from "./table.module.scss";
import { ITask } from "../../../utils/api/api.interface";
import { ILegendHorizontal, ITable, IVerticalLegend } from "./table.interface";
import IBoardElement from "../board-element/board-element.interface";

/**
 * @component Основной компонент таблицы игрового поля с легендами
 * @param {ITable} props - Свойства компонента
 * @param {ITask} props.task - Объект задачи кроссворда
 * @param {Object} [props.help] - Объект подсказки (опционально)
 * @returns {JSX.Element} Полное игровое поле с легендами и модальными окнами
 * 
 * @description
 * Компонент реализует полную структуру игрового поля японского кроссворда:
 * - Генерацию горизонтальных и вертикальных легенд
 * - Управление состоянием победы
 * - Отображение модального окна при победе
 * - Координацию всех дочерних компонентов поля
 * 
 * @state
 * @property {boolean} modalShow - Видимость модального окна победы
 * @property {boolean} isWin - Флаг завершения кроссворда
 * @property {ILegendHorizontal | null} horizontalLegend - Данные горизонтальной легенды
 * @property {IVerticalLegend | null} verticalLegend - Данные вертикальной легенды
 */
const Table: FC<ITable> = ({ task, help }) => {
    // Состояние отображения модального окна
    const [modalShow, setModalShow] = useState(false);

    // Состояние победы
    const [isWin, setWin] = useState(false);

    // Горизонтальная легенда (подсказки сверху)
    const [horizontalLegend, setHorizontalLegend] = useState<ILegendHorizontal | null>(null);

    // Вертикальная легенда (подсказки слева)
    const [verticalLegend, setVerticalLegend] = useState<IVerticalLegend | null>(null);

    /**
     * Создает горизонтальную легенду для подсказок сверху
     * @param {ITask} task - Объект задачи кроссворда
     * @returns {ILegendHorizontal} Объект с данными горизонтальной легенды
     * 
     * @description
     * Анализирует решение по столбцам и создает числовые подсказки:
     * - Для каждого столбца подсчитывает группы закрашенных клеток
     * - Выравнивает количество подсказок во всех столбцах
     * - Преобразует в формат для отображения сверху поля
     * 
     * @example
     * Столбец [1,1,0,1,1] → Подсказки [2,2]
     */
    const createHorizontalLegend = (task: ITask): ILegendHorizontal => {
        let legend = [];
        let col = [];

        for (let x = 0; x < task.width; x++) {
            let sum = 0;
            for (let y = 0; y < task.height; y++) {
                if (task.task[y * task.width + x] === "1") {
                    sum++;
                } else {
                    if (sum > 0) {
                        col.push(sum);
                    }
                    sum = 0;
                }
            }
            if (sum > 0) {
                col.push(sum);
            }

            legend.push(col);
            col = [];
        }

        // Находим максимальное количество подсказок в столбце
        let max = 0;
        legend.forEach((col) => {
            max = col.length > max ? col.length : max;
        });

        // Выравниваем все столбцы до максимальной длины
        let equLegend: (number | null)[][] = legend.map(col => [...col]);

        legend.forEach((col, num) => {
            if (col.length < max) {
                for (let i = col.length; i < max; ++i) {
                    equLegend[num].unshift(null);
                }
            }
        });

        // Преобразуем в плоский массив для отображения
        const outLegend = [];

        for (let y = 0; y < max; y++) {
            for (let x = 0; x < equLegend.length; x++) {
                outLegend.push(equLegend[x][y]);
            }
        }

        return {
            legend: outLegend,
            width: Math.floor(outLegend.length / max),
            height: max,
        };
    };

    /**
     * Создает вертикальную легенду для подсказок слева
     * @param {ITask} task - Объект задачи кроссворда
     * @returns {IVerticalLegend} Объект с данными вертикальной легенды
     * 
     * @description
     * Анализирует решение по строкам и создает числовые подсказки:
     * - Для каждой строки подсчитывает группы закрашенных клеток
     * - Выравнивает количество подсказок во всех строках
     * - Преобразует в формат для отображения слева поля
     * 
     * @example
     * Строка [1,1,0,1,0] → Подсказки [2,1]
     */
    const createVerticalLegend = (task: ITask): IVerticalLegend => {
        const legend: number[][] = [];

        // Анализируем каждую строку
        for (let y = 0; y < task.height; y++) {
            const row: number[] = [];
            let sum = 0;

            for (let x = 0; x < task.width; x++) {
                const index = y * task.width + x;
                if (task.task[index] === "1") {
                    sum++;
                } else {
                    if (sum > 0) {
                        row.push(sum);
                        sum = 0;
                    }
                }
            }

            if (sum > 0) {
                row.push(sum);
            }

            legend.push(row);
        }

        // Находим максимальное количество подсказок в строке
        const max = Math.max(...legend.map(row => row.length), 0);

        // Выравниваем все строки до максимальной длины
        const equLegend: (number | null)[][] = legend.map(row => {
            const missing = max - row.length;
            return missing > 0
                ? [...Array(missing).fill(null), ...row]
                : [...row];
        });

        // Преобразуем в плоский массив для отображения
        const outLegend: (number | null)[] = [];
        for (let y = 0; y < equLegend.length; y++) {
            for (let x = 0; x < max; x++) {
                outLegend.push(equLegend[y][x]);
            }
        }

        return {
            legend: outLegend,
            width: max,
            height: equLegend.length,
        };
    };

    /**
     * Проверяет соответствие текущего состояния поля решению
     * @param {IBoard[]} board - Текущее состояние игрового поля
     * @returns {void}
     * 
     * @description
     * Сравнивает каждую клетку игрового поля с эталонным решением:
     * - Игнорирует клетки с крестиком (считает их пустыми)
     * - Устанавливает состояние победы при полном совпадении
     * 
     * @memorized Использует useCallback для оптимизации
     */
    const checkWin = useCallback(
        (board: IBoardElement[]) => {
            if (board.length === 0) {
                setWin(false);
                return;
            }

            for (let i = 0; i < board.length; i++) {
                const content =
                    board[i].content === "X" ? "0" : board[i].content;

                if (content !== task.task[i]) {
                    setWin(false);
                    return;
                }
            }

            setWin(true);
        },
        [task.task]
    );

    /**
     * Эффект обработки победы
     * @dependency [isWin, task.id] - Зависит от состояния победы и ID задачи
     */
    useEffect(() => {
        if (isWin) {
            setModalShow(true);
        }
    }, [isWin, task.id]);

    /**
     * Эффект инициализации легенд
     * @dependency [task] - Зависит от объекта задачи
     */
    useEffect(() => {
        setHorizontalLegend(createHorizontalLegend(task));
        setVerticalLegend(createVerticalLegend(task));
    }, [task]);

    /**
     * Обрабатывает закрытие модального окна
     * @param {React.MouseEvent} e - Событие клика
     * @returns {void}
     */
    const closeHandler = (e: React.MouseEvent) => {
        e.preventDefault();
        setModalShow(false);
        setWin(false);
    };

    return (
        horizontalLegend &&
        verticalLegend && (
            <>
                <div
                    className={styles.table}
                    style={{
                        minWidth: `${(Number(verticalLegend.width) +
                            Number(task.width)) *
                            25 +
                            4
                            }px`,
                    }}
                >
                    <BoardZeroField
                        className={styles.zero_field}
                        width={verticalLegend.width}
                        height={horizontalLegend.height}
                    />
                    <LegendHorizontal
                        legend={horizontalLegend.legend}
                        width={horizontalLegend.width}
                    />
                    <div className={styles.new_line} />
                    <LegendVertical
                        legend={verticalLegend.legend}
                        width={verticalLegend.width}
                    />
                    <Board
                        taskId={task.id}
                        width={task.width}
                        height={task.height}
                        checkWin={checkWin}
                        help={help}
                    />
                </div>
                {modalShow && (
                    <Modal
                        image="modal1.png"
                        title="Поздравляем, вы разгадали кроссворд!"
                        onClick={closeHandler}
                    >
                        <ModalButton onClick={closeHandler}>
                            Закрыть
                        </ModalButton>
                    </Modal>
                )}
            </>
        )
    );
};

export default Table;
