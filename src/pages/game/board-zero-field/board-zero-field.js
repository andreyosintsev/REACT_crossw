import { Fragment, useState, useEffect } from "react";
import ZeroElement from "../board-zero-element/board-zero-element";

import BoardZeroFieldStyles from "./board-zero-field.module.css";

/**
 * @component - Компонент пустого игрового поля
 * @param {number} width - Ширина поля (в клетках)
 * @param {number} height - Высота поля (в клетках)
 * @returns {JSX.Element} Пустое игровое поле заданного размера
 *
 * @description
 * Компонент создает пустую сетку из ZeroElement компонентов:
 * - Инициализируется при монтировании компонента
 * - Автоматически переносит строки согласно ширине поля
 * - Используется как основа для игровых полей
 *
 * @state
 * @property {Array} zeroField - Массив пустых клеток поля
 *
 * @method createZeroField - Создает массив пустых клеток
 *
 * @see ZeroElement Компонент пустой клетки
 * @see BoardZeroFieldStyles Стили компонента
 **/
const BoardZeroField = ({ width, height }) => {
    const [zeroField, setZeroField] = useState([]);

    /**
     * Создает массив пустых клеток для поля
     * @param {number} width - Ширина поля
     * @param {number} height - Высота поля
     **/

    const createZeroField = (width, height) =>
        setZeroField(new Array(width * height).fill(""));

    useEffect(() => {
        createZeroField(width, height);
    }, [width, height]);

    return (
        <div key="boardZeroField" className={BoardZeroFieldStyles.zero_field}>
            {zeroField.map((_, i) => {
                return (
                    <Fragment key={`zero${i}`}>
                        {i !== 0 && i % width === 0 && (
                            <div className={BoardZeroFieldStyles.newLine}></div>
                        )}
                        <ZeroElement />
                    </Fragment>
                );
            })}
        </div>
    );
};

export default BoardZeroField;
