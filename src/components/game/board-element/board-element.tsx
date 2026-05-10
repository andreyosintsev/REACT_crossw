import cn from "classnames";

import IBoardElement from "./board-element.interface";

import storeGame from "../../../store/storeGame/storeGame";
import storeLegend from "../../../store/storeLegend/storeLegend";

import styles from "./board-element.module.scss";

/**
 * Компонент клетки игрового поля японского кроссворда
 *
 * @component
 * @param {IBoardElement} props - Свойства компонента
 * @param {number} props.xCoord - X-координата клетки на игровом поле
 * @param {number} props.yCoord - Y-координата клетки на игровом поле
 * @param {string} props.content - Содержимое клетки ("0", "1" или "X")
 * @returns {JSX.Element} Клетка игрового поля с обработкой взаимодействий
 *
 * @description
 * Компонент реализует отдельную клетку игрового поля с особенностями:
 * - Визуальное отображение состояния клетки (пустая, закрашенная, с крестиком)
 * - Обработка пользовательских взаимодействий (клики, наведение)
 * - Динамическое применение стилей границ для группировки клеток
 * - Интеграция с системой подсветки легенд
 *
 * @example
 * <BoardElement
 *   xCoord={2}
 *   yCoord={3}
 *   content="1"
 * />
 */
const BoardElement = ({ xCoord, yCoord, content }: IBoardElement) => {
    const applyCellAction = storeGame((state) => state.applyCellAction);
    const setHighlightedLegend = storeLegend((state) => state.setHighlightedLegend);
    const clearHighlightedLegend = storeLegend((state) => state.clearHighlightedLegend);

    const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
        e.preventDefault();

        const action = e.pointerType === "mouse" && e.button === 2 ? "cross" : "fill";

        applyCellAction(xCoord, yCoord, action);
    };

    const handleContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    /**
     * Формирует строку CSS-классов на основе координат и состояния клетки
     * @type {string}
     *
     * @logic
     * - Правая граница: для каждой 5-й клетки по X-координате
     * - Нижняя граница: для каждой 5-й клетки по Y-координате
     * - Основной стиль: определяется содержимым клетки (be_0, be_1, be_X)
     */

    return (
        <div
            className={cn(
                styles.be,
                // Основной стиль: определяется содержимым клетки (be_0, be_1, be_X)
                styles[`be_${content}`],
                {
                    // Добавляем правую границу для каждой 5-й клетки по горизонтали
                    [styles["be_border-right"]]: (xCoord + 1) % 5 === 0,
                    // Добавляем нижнюю границу для каждой 5-й клетки по вертикали
                    [styles["be_border-bottom"]]: (yCoord + 1) % 5 === 0,
                },
            )}
            data-x={xCoord}
            data-y={yCoord}
            onPointerDown={handlePointerDown}
            onPointerEnter={() => setHighlightedLegend(xCoord, yCoord)}
            onPointerMove={() => setHighlightedLegend(xCoord, yCoord)}
            onPointerLeave={clearHighlightedLegend}
            onContextMenu={handleContextMenu}
        />
    );
};

export default BoardElement;
