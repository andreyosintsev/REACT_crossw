import { useRef } from "react";

import cn from "classnames";

import { IBoardElement } from "./board-element.interface";

import storeGame from "../../../store/storeGame/storeGame";
import storeLegend from "../../../store/storeLegend/storeLegend";

import { TOUCH_MOVE_THRESHOLD, TOUCH_MODE_THRESHOLD } from "../../../declarations/constants";

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

    const toggleFillMode = storeGame((state) => state.toggleFillMode);

    const touchStartRef = useRef({ x: 0, y: 0, moved: false });
    const touchLongTimerRef = useRef<number | null>(null);
    const touchLongTriggered = useRef(false);

    const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
        setHighlightedLegend(xCoord, yCoord);

        if (e.pointerType !== "touch") {
            e.preventDefault();

            const action = e.button === 2 ? "cross" : "fill";
            applyCellAction(xCoord, yCoord, action);

            return;
        }

        e.currentTarget.setPointerCapture(e.pointerId);

        touchStartRef.current = { x: e.clientX, y: e.clientY, moved: false };

        touchLongTriggered.current = false;

        clearLongPressTimer();

        touchLongTimerRef.current = window.setTimeout(() => {
            if (touchStartRef.current.moved) {
                return;
            }

            toggleFillMode();
            touchLongTriggered.current = true;

            navigator.vibrate?.(100);
        }, TOUCH_MODE_THRESHOLD);
    };

    const clearLongPressTimer = () => {
        if (touchLongTimerRef.current !== null) {
            clearTimeout(touchLongTimerRef.current);
            touchLongTimerRef.current = null;
        }
    };

    const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
        setHighlightedLegend(xCoord, yCoord);

        if (e.pointerType !== "touch") {
            return;
        }

        const dx = Math.abs(e.clientX - touchStartRef.current.x);
        const dy = Math.abs(e.clientY - touchStartRef.current.y);

        if (dx > TOUCH_MOVE_THRESHOLD || dy > TOUCH_MOVE_THRESHOLD) {
            touchStartRef.current.moved = true;
            clearLongPressTimer();
        }
    };

    const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
        if (e.pointerType !== "touch") {
            return;
        }

        clearLongPressTimer();

        if (touchStartRef.current.moved) {
            return;
        }

        const currentFillMode = storeGame.getState().fillMode;

        applyCellAction(xCoord, yCoord, currentFillMode);
    };

    const handleContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const handlePointerEnter = () => {
        setHighlightedLegend(xCoord, yCoord);
    };

    const handlePointerCancel = () => {
        clearLongPressTimer();
        clearHighlightedLegend();
    };

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
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerEnter={handlePointerEnter}
            onPointerLeave={clearHighlightedLegend}
            onPointerCancel={handlePointerCancel}
            onContextMenu={handleContextMenu}
        />
    );
};

export default BoardElement;
