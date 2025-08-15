import { Fragment, useState, useEffect, useCallback } from "react";
import BoardElement from "../board-element/board-element";

import {
    saveBoardToLocalStorage,
    loadBoardFromLocalStorage,
} from "../../../utils/local-storage/local-storage";

import BoardStyles from "./board.module.css";

/**
 * @component - компонент игрового поля собственно с рисунком
 * @param {string} taskId - Номер кроссворда
 * @param {number} width - Ширина игрового поля (в клетках)
 * @param {number} height - Высота игрового поля (в клетках)
 * @param {Function} checkWin - Функция проверки победы
 * @param {Object|null} help - Объект подсказки (опционально)
 * @returns {JSX.Element} - Игровое поле
 *
 * @description
 * Компонент реализует интерактивное игровое поле с возможностью:
 * - ЛКМ - закрасить клетку
 * - ПКМ - поставить крестик
 * - Автосохранение состояния
 * - Загрузку сохранённого состояния
 * - Обработку подсказок
 *
 * @state
 * @property {Array} board - Массив клеток игрового поля
 *
 * @method initBoard - инициализирует новое или загружает сохранённое поле
 * @method boardClickHandler - обрабатывает клики по полю
 *
 * @see BoardElement - дочерний компонент клетки поля
 * @see saveBoardToLocalStorage - для сохранения состояния
 * @see loadBoardFromLocalStorage - для загрузки состояния
 */
const Board = ({ taskId, width, height, checkWin, help }) => {
    const [board, setBoard] = useState([]);

    /**
     * Обработчик кликов по игровому полю
     * @param {MouseEvent} e - событие мыши
     */
    const boardClickHandler = (e) => {
        e.preventDefault();

        const x = +e.target.dataset.x;
        const y = +e.target.dataset.y;
        const cellIndex = y * width + x;

        let newBoard = [...board];

        switch (e.button) {
            case 0:
                newBoard[cellIndex].content =
                    board[cellIndex].content !== "1" ? "1" : "0";
                break;
            case 2:
                newBoard[cellIndex].content =
                    board[cellIndex].content !== "X" ? "X" : "0";
                break;
            default:
                newBoard[cellIndex].content =
                    board[cellIndex].content !== "X" ? "X" : "0";
        }
        setBoard(newBoard);
        saveBoardToLocalStorage(taskId, newBoard);
    };

    const initBoard = useCallback(
        (help) => {
            const newBoard = loadBoardFromLocalStorage(taskId) || [];

            if (newBoard.length === 0) {
                for (let y = 0; y < height; y++) {
                    for (let x = 0; x < width; x++) {
                        newBoard.push({
                            xCoord: x,
                            yCoord: y,
                            content: "0",
                        });
                    }
                }
            }

            if (help) {
                newBoard[help.pos].xCoord = help.pos % width;
                newBoard[help.pos].yCoord = Math.floor(help.pos / width);
                newBoard[help.pos].content = "" + help.content;
            }

            setBoard(newBoard);
            saveBoardToLocalStorage(taskId, newBoard);
        },
        [width, height, taskId]
    );

    useEffect(() => {
        initBoard(help);
    }, [initBoard, help]);

    useEffect(() => {
        checkWin(board);
    }, [checkWin, board]);

    return (
        <>
            <div
                className={BoardStyles.board}
                onMouseDown={boardClickHandler}
                onContextMenu={(e) => {
                    e.preventDefault();
                }}
            >
                {board.map((item, i) => {
                    return (
                        <Fragment key={`board${i}`}>
                            {i !== 0 && i % width === 0 && (
                                <div className={BoardStyles.newLine}></div>
                            )}
                            <BoardElement
                                xCoord={item.xCoord}
                                yCoord={item.yCoord}
                                content={item.content}
                            />
                        </Fragment>
                    );
                })}
            </div>
            <div className={BoardStyles.newLine} />
        </>
    );
};

export default Board;
