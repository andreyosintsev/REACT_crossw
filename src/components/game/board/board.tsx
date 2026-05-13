import { useEffect } from "react";

import { IBoardProps } from "./board.interface";

import BoardElement from "../board-element/board-element";
import DynamicGrid from "../../../components/game/dynamic-grid/dynamic-grid";

import storeGame from "../../../store/storeGame/storeGame";

import styles from "./board.module.scss";

/**
 * Компонент игрового поля японского кроссворда
 *
 * @component
 * @param {IBoardProps} props - Свойства компонента
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
const Board = ({ width, height, appearance }: IBoardProps) => {
    // Получаем состояние и методы из игрового хранилища
    const { board, solved, checkWin } = storeGame();

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
        <div className={styles.board}>
            <DynamicGrid columns={width} rows={height} className={solved ? styles.blocked : ""} cellSize={appearance.boardElement.size}>
                {board.map((item, i) => {
                    return <BoardElement key={`board${i}`} xCoord={item.xCoord} yCoord={item.yCoord} content={item.content} />;
                })}
            </DynamicGrid>
        </div>
    );
};

export default Board;
