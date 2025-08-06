import React from "react";

import BoardElementStyles from "./board-element.module.css";

/**
 * @component - компонент отдельной клетки игрового поля
 * @param {number} xCoord - X-координата клетки (горизонталь)
 * @param {number} yCoord - Y-координата клетки (вертикаль)
 * @param {string} content - CSS-класс, определяющий состояние клетки
 * @returns {JSX.Element} Элемент клетки игрового поля
 *
 * @description
 * Отображает одну клетку игрового поля с возможными состояниями:
 * - Свободная (free)
 * - Закрашенная (full)
 * - С крестиком (cross)
 *
 * Автоматически добавляет границы:
 * - Правую границу для каждой 5-й клетки по горизонтали
 * - Нижнюю границу для каждой 5-й клетки по вертикали
 *
 * @see Board Родительский компонент игрового поля
 **/
const BoardElement = ({ xCoord, yCoord, content }) => {
    let style = "";
    if ((xCoord + 1) % 5 === 0) {
        style = BoardElementStyles["border_right"];
    }
    if ((yCoord + 1) % 5 === 0) {
        style += " " + BoardElementStyles["border_bottom"];
    }
    return (
        <div
            key={`bel${xCoord * yCoord}`}
            className={`${BoardElementStyles.be} ${content} ${style}`}
            data-x={xCoord}
            data-y={yCoord}
        ></div>
    );
};

export default BoardElement;
