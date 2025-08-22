import { useState, useEffect, useCallback, FC, Fragment } from "react";

import {
    saveBoardToLocalStorage,
    loadBoardFromLocalStorage,
} from "../../../utils/local-storage/local-storage";

import { IGameBoardProps, IHelp } from "./board.interface";

import styles from "./board.module.scss";
import BoardElement from "../board-element/board-element";
import IBoardElement from "../board-element/board-element.interface";

/**
 * @component Компонент игрового поля для японских кроссвордов
 * @param {IGameBoardProps} props - Свойства компонента
 * @param {string} props.taskId - Уникальный идентификатор задачи/кроссворда
 * @param {number} props.width - Ширина игрового поля в клетках
 * @param {number} props.height - Высота игрового поля в клетках
 * @param {Function} props.checkWin - Функция проверки завершения кроссворда
 * @param {IHelp} [props.help] - Объект подсказки
 * @returns {JSX.Element} Интерактивное игровое поле
 */
const Board: FC<IGameBoardProps> = ({ taskId, width, height, checkWin, help }) => {
    // Состояние игрового поля
    const [board, setBoard] = useState<IBoardElement[]>([]);

    /**
     * Обработчик кликов по игровому полю
     * @param {React.MouseEvent<HTMLDivElement>} e - Событие мыши
     */
    const boardClickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
        // Предотвращаем стандартное поведение браузера
        e.preventDefault();

        const target = e.target as HTMLElement;

        // Проверяем наличие dataset свойств
        if (!target.dataset.x || !target.dataset.y) {
            return;
        }

        // Получаем координаты клетки
        const x = +target.dataset.x;
        const y = +target.dataset.y;
        const cellIndex = y * width + x;

        // Создаем копию текущего состояния поля
        let newBoard = [...board]

        // Обрабатываем разные типы кликов
        switch (e.button) {
            case 0: // Левая кнопка мыши - закрашивание
                newBoard[cellIndex].content =
                    board[cellIndex].content !== "1" ? "1" : "0";
                break;
            case 2: // Правая кнопка мыши - крестик
                newBoard[cellIndex].content =
                    board[cellIndex].content !== "X" ? "X" : "0";
                break;
            default: // Другие кнопки - ноль по умолчанию
                newBoard[cellIndex].content =
                    board[cellIndex].content !== "X" ? "X" : "0";
        }

        // Обновляем состояние и сохраняем в localStorage
        setBoard(newBoard);
        saveBoardToLocalStorage(taskId, newBoard);
    };

    /**
     * Инициализация игрового поля
     * @param {IHelp} help - Объект подсказки
     */
    const initBoard = useCallback(
        (help: IHelp) => {
            // Загружаем сохраненное состояние или создаем пустой массив
            const newBoard: IBoardElement[] = loadBoardFromLocalStorage(taskId) || [];

            // Если поле пустое - создаем новое
            if (newBoard.length === 0) {
                for (let y = 0; y < height; y++) {
                    for (let x = 0; x < width; x++) {
                        newBoard.push({
                            xCoord: x,       // X-координата клетки
                            yCoord: y,       // Y-координата клетки
                            content: "0",    // Состояние: "0" - пусто, "1" - закрашено, "X" - крестик
                        });
                    }
                }
            }

            // Если предоставлена position в подсказке - применяем подсказку
            if (help.position) {
                newBoard[help.position].xCoord = help.position % width;
                newBoard[help.position].yCoord = Math.floor(help.position / width);
                newBoard[help.position].content = "" + help.content;
            }

            // Устанавливаем состояние и сохраняем
            setBoard(newBoard);
            saveBoardToLocalStorage(taskId, newBoard);
        },
        [width, height, taskId] // Зависимости для useCallback
    );

    // Эффект для инициализации поля при монтировании и изменении подсказок
    useEffect(() => {
        initBoard(help);
    }, [initBoard, help]);

    // Эффект для проверки победы при изменении состояния поля
    useEffect(() => {
        checkWin(board);
    }, [checkWin, board]);

    return (
        <>
            <div
                className={styles.board}
                onMouseDown={boardClickHandler}
                onContextMenu={(e) => {
                    e.preventDefault();
                }}
            >
                {board.map((item, i) => {
                    return (
                        <Fragment key={`board${i}`}>
                            {i !== 0 && i % width === 0 && (
                                <div className={styles.newLine}></div>
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
            <div className={styles.newLine} />
        </>
    );
};

export default Board;
