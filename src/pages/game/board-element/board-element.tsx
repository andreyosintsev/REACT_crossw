import { FC, useEffect, useRef } from "react";

import styles from "./board-element.module.scss";
import IBoardElement from "./board-element.interface";
import { gameStoreControl } from "../../../services/gameStoreControl/gameStoreControl";
import legendStore from "../../../services/legendStore/legendStore";

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
const BoardElement: FC<IBoardElement> = ({ xCoord, yCoord, content }) => {
    // Ref для доступа к DOM-элементу клетки
    const ref = useRef<HTMLDivElement | null>(null);

    // Получаем обработчики взаимодействий из хранилищ
    const { handleBoardInteraction } = gameStoreControl();
    const { highlightLegends } = legendStore()

    /**
     * Формирует строку CSS-классов на основе координат и состояния клетки
     * @type {string}
     * 
     * @logic
     * - Правая граница: для каждой 5-й клетки по X-координате
     * - Нижняя граница: для каждой 5-й клетки по Y-координате
     * - Основной стиль: определяется содержимым клетки (be_0, be_1, be_X)
     */
    let style = "";

    // Добавляем правую границу для каждой 5-й клетки по горизонтали
    if ((xCoord + 1) % 5 === 0) {
        style = styles["be_border-right"];
    }

    // Добавляем нижнюю границу для каждой 5-й клетки по вертикали
    if ((yCoord + 1) % 5 === 0) {
        style += " " + styles["be_border-bottom"];
    }

    /**
     * Эффект управления обработчиками событий клетки
     * @dependency [] - Запускается единожды при монтировании
     * 
     * @description
     * Устанавливает и очищает обработчики событий для клетки:
     * - mouseenter/mouseleave: обработка наведения/ухода курсора
     * - click: обработка кликов (левая и правая кнопка мыши)
     * - mousemove: подсветка соответствующих легенд
     * 
     * @cleanup
     * Автоматически удаляет все обработчики при размонтировании компонента
     * для предотвращения утечек памяти
     */
    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        element.addEventListener('mouseenter', handleBoardInteraction);
        element.addEventListener('mouseleave', handleBoardInteraction);
        element.addEventListener('click', handleBoardInteraction);
        element.addEventListener('mousemove', highlightLegends);

        return () => {
            element.removeEventListener('mouseenter', handleBoardInteraction);
            element.removeEventListener('mouseleave', handleBoardInteraction);
            element.removeEventListener('click', handleBoardInteraction);
            element.removeEventListener('mousemove', highlightLegends);
        };
    }, []);

    return (
        <div
            ref={ref}
            className={`${styles.be} ${styles["be_" + content]} ${style}`}
            data-x={xCoord}
            data-y={yCoord}
        ></div>
    );
};

export default BoardElement;
