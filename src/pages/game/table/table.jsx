import { useState, useEffect, useCallback } from "react";

import BoardZeroField from "../board-zero-field/board-zero-field";
import Board from "../board/board";
import LegendHorizontal from "../legend-horizontal/legend-horizontal";
import LegendVertical from "../legend-vertical/legend-vertical";
import Modal from "../../../components/modal/modal";
import ModalButton from "../../../components/modal-button/modal-button";

import TableStyles from "./table.module.css";

/**
 * @component - Основной компонент игрового стола с легендами и логикой игры
 * @param {Object} task - Объект задачи кроссворда
 * @param {boolean} help - Флаг включения режима подсказок
 * @returns {JSX.Element} Полное игровое поле с легендами и модальными окнами
 *
 * @description
 * Компонент реализует полную логику игры в кроссворд:
 * - Создание горизонтальных и вертикальных легенд
 * - Проверку победы
 * - Управление состоянием игры
 * - Отображение модальных окон
 * - Интеграцию всех дочерних компонентов
 *
 * @state
 * @property {boolean} modalShow - Видимость модального окна
 * @property {boolean} isWin - Флаг победы
 * @property {Object} horizontalLegend - Данные горизонтальной легенды
 * @property {Object} verticalLegend - Данные вертикальной легенды
 *
 * @method createHorizontalLegend - Генерирует данные для горизонтальной легенды
 * @method createVerticalLegend - Генерирует данные для вертикальной легенды
 * @method checkWin - Проверяет решение на корректность
 * @method closeHandler - Обрабатывает закрытие модального окна
 **/
const Table = ({ task, help }) => {
    // Отображение модального окна
    const [modalShow, setModalShow] = useState(false);

    // Состояние выигрыша
    const [isWin, setWin] = useState(false);

    // Горизонтальная легенда
    const [horizontalLegend, setHorizontalLegend] = useState(null);

    // Вертикальная легенда
    const [verticalLegend, setVerticalLegend] = useState(null);

    /**
     * Создает горизонтальную легенду
     * @param {Object} task - Объект задачи
     * @returns {Object} Данные легенды {legend: Array, width: number, height: number}
     **/
    const createHorizontalLegend = (task) => {
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

        let max = 0;
        legend.forEach((col) => {
            max = col.length > max ? col.length : max;
        });

        let equLegend = [...legend];

        legend.forEach((col, num) => {
            if (col.length < max) {
                for (let i = col.length; i < max; ++i) {
                    equLegend[num].unshift("");
                }
            }
        });

        const outLegend = [];

        for (let y = 0; y < legend[0].length; y++) {
            for (let x = 0; x < legend.length; x++) {
                outLegend.push(legend[x][y]);
            }
        }

        return {
            legend: outLegend,
            width: Math.floor(outLegend.length / max),
            height: max,
        };
    };

    /**
     * Создает вертикальную легенду
     * @param {Object} task - Объект задачи
     * @returns {Object} Данные легенды {legend: Array, width: number, height: number}
     **/
    const createVerticalLegend = (task) => {
        let legend = [];
        let row = [];

        for (let y = 0; y < task.height; y++) {
            let sum = 0;
            for (let x = 0; x < task.width; x++) {
                if (task.task[y * task.width + x] === "1") {
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
            row = [];
        }

        let max = 0;
        legend.forEach((row) => {
            max = row.length > max ? row.length : max;
        });

        let equLegend = [...legend];

        legend.forEach((row, num) => {
            if (row.length < max) {
                for (let i = row.length; i < max; ++i) {
                    equLegend[num].unshift("");
                }
            }
        });

        const outLegend = [];

        for (let y = 0; y < legend.length; y++) {
            for (let x = 0; x < legend[0].length; x++) {
                outLegend.push(legend[y][x]);
            }
        }

        return {
            legend: outLegend,
            width: max,
            height: Math.floor(outLegend.length / max),
        };
    };

    /**
     * Проверяет соответствие текущего поля решению
     * @param {Array} board - Текущее состояние игрового поля
     **/
    const checkWin = useCallback(
        (board) => {
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

    useEffect(() => {
        if (isWin) {
            //clearBoardInLocalStorage(task.id);
            setModalShow(true);
        }
    }, [isWin, task.id]);

    useEffect(() => {
        setHorizontalLegend(createHorizontalLegend(task));
        setVerticalLegend(createVerticalLegend(task));
    }, [task]);

    /**
     * Обрабатывает закрытие модального окна
     * @param {Event} e - Событие
     **/
    const closeHandler = (e) => {
        e.preventDefault();
        setModalShow(false);
        setWin(false);
    };

    return (
        horizontalLegend &&
        verticalLegend && (
            <>
                <div
                    className={TableStyles.table}
                    style={{
                        minWidth: `${
                            (Number.parseInt(verticalLegend.width) +
                                Number.parseInt(task.width)) *
                                25 +
                            4
                        }px`,
                    }}
                >
                    <BoardZeroField
                        className={TableStyles.zero_field}
                        width={verticalLegend.width}
                        height={horizontalLegend.height}
                    />
                    <LegendHorizontal
                        legend={horizontalLegend.legend}
                        width={horizontalLegend.width}
                    />
                    <div className={TableStyles.new_line} />
                    <LegendVertical
                        legend={verticalLegend.legend}
                        width={verticalLegend.width}
                    />
                    <Board
                        taskId={task.id}
                        width={task.width}
                        height={task.height}
                        task={task.task}
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
