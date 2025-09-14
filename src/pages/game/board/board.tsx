import { useEffect, FC } from "react";

import { IGameBoardProps } from "./board.interface";

import BoardElement from "../board-element/board-element";
import DynamicGrid from "../../../components/dynamic-grid/dynamic-grid";
import { storeGame } from "../../../store/storeGame/storeGame";

import styles from "./board.module.scss";

/**
 * Компонент игрового поля японского кроссворда
 *
 * @component
 * @param {IGameBoardProps} props - Свойства компонента
 * @param {number} props.width - Ширина игрового поля в клетках
 * @param {number} props.height - Высота игрового поля в клетках
 * @returns {JSX.Element} Игровое поле с клетками и обработкой взаимодействий
 *
 * @description
 * Компонент реализует основное игровое поле японского кроссворда с:
 * - Динамической сеткой клеток заданного размера
 * - Обработкой пользовательских взаимодействий
 * - Автоматической проверкой условия победы
 * - Блокировкой взаимодействия после завершения игры
 * - Визуальным отображением состояния всех клеток
 *
 * @example
 * <Board width={15} height={15} />
 */
const Board: FC<IGameBoardProps> = ({ width, height }) => {
    // Получаем состояние и методы из игрового хранилища
    const { board, handleBoardClick, gameCompleted, checkWin } = storeGame();

    /**
     * Эффект проверки условия победы при изменении состояния поля
     * @dependency [board, checkWin] - Зависит от состояния поля и функции проверки
     *
     * @description
     * Автоматически проверяет условие победы после каждого изменения
     * состояния игрового поля:
     * - Вызывается после каждого обновления массива board
     * - Использует мемоизированную функцию checkWin из хранилища
     * - Не вызывает лишних ререндеров благодаря оптимизации Zustand
     *
     * @importance
     * Критически важный эффект для игровой логики - определяет
     * момент завершения игры и победы пользователя
     */
    useEffect(() => {
        checkWin(board);
    }, [board, checkWin]);

    return (
        <>
            <DynamicGrid
                columns={width}
                rows={height}
                onCellClick={handleBoardClick}
                onContextMenu={(e) => e.preventDefault()}
                className={`${gameCompleted ? styles.blocked : ""}`}
            >
                {board.map((item, i) => {
                    return (
                        <BoardElement
                            key={`board${i}`}
                            xCoord={item.xCoord}
                            yCoord={item.yCoord}
                            content={item.content}
                        />
                    );
                })}
            </DynamicGrid>
        </>
    );
};

export default Board;
