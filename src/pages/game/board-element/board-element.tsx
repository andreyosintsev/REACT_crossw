import { FC, memo } from "react";

import styles from "./board-element.module.scss";
import IBoardElement from "./board-element.interface";

/**
 * @component Компонент отдельной клетки игрового поля
 * @param {IBoardElement} props - Свойства компонента
 * @param {number} props.xCoord - X-координата клетки на поле
 * @param {number} props.yCoord - Y-координата клетки на поле
 * @param {string} props.content - Содержимое клетки ("0", "1" или "X")
 * @returns {JSX.Element} Визуальное представление клетки игрового поля
 * 
 * @description
 * Компонент отображает одну клетку игрового поля японского кроссворда с:
 * - Визуальным отображением состояния клетки
 * - Границами для группировки клеток (каждые 5 клеток)
 * - Data-атрибутами для обработки кликов
 * - Оптимизацией ререндеров через memo
 * 
 * @states
 * - "0" - Пустая клетка (белая)
 * - "1" - Закрашенная клетка (черная)
 * - "X" - Клетка с крестиком (помечена крестиком)
 * 
 * @optimization
 * Компонент обернут в memo для предотвращения лишних ререндеров
 * при неизменных пропсах
 */
const BoardElement: FC<IBoardElement> = memo(({ xCoord, yCoord, content }) => {
    /**
     * Определяет CSS-класс в зависимости от содержимого клетки
     * @type {string}
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

    return (
        <div
            className={`${styles.be} ${styles["be_" + content]} ${style}`}
            data-x={xCoord}
            data-y={yCoord}
        ></div>
    );
});

export default BoardElement;
