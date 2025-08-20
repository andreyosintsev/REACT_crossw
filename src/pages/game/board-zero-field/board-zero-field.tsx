import { Fragment, useState, useEffect, FC } from "react";
import ZeroElement from "../board-zero-element/board-zero-element";

import styles from "./board-zero-field.module.scss";
import IBoardZeroField from "./board-zero-field.interface";

/**
 * @component Компонент пустого (нулевого) игрового поля
 * @param {IBoardZeroField} props - Свойства компонента
 * @param {number} props.width - Ширина поля в клетках
 * @param {number} props.height - Высота поля в клетках
 * @returns {JSX.Element} Пустое игровое поле заданного размера
 * 
 * @description
 * Компонент создает пустую сетку игрового поля для японского кроссворда:
 * - Служит основой для размещения цифровых подсказок
 * - Создает правильную структуру строк и столбцов
 * - Автоматически добавляет переносы строк
 * - Используется как визуальный шаблон перед загрузкой данных
 * 
 * @state
 * @property {string[]} zeroField - Массив пустых клеток поля
 * 
 * @method createZeroField - Создает массив пустых клеток
 * 
 * @see ZeroElement Компонент пустой клетки
 * @see Board Основной компонент игрового поля
 */
const BoardZeroField: FC<IBoardZeroField> = ({ width, height }) => {
    /**
     * Состояние массива пустых клеток
     * @type {string[]}
     */
    const [zeroField, setZeroField] = useState<string[]>([]);

    /**
     * Создает массив пустых клеток для поля заданного размера
     * @param {number} width - Ширина поля в клетках
     * @param {number} height - Высота поля в клетках
     * @returns {void}
     * 
     * @description
     * Генерирует массив длины width * height, заполненный пустыми строками
     * Каждый элемент массива представляет одну клетку будущего поля
     */
    const createZeroField = (width: number, height: number) =>
        setZeroField(new Array(width * height).fill(""));

    /**
     * Эффект инициализации поля при монтировании и изменении размеров
     * @dependency [width, height] - Зависит от ширины и высоты поля
     */
    useEffect(() => {
        createZeroField(width, height);
    }, [width, height]);

    return (
        <div key="boardZeroField" className={styles.zero_field}>
            {zeroField.map((_, i) => {
                return (
                    <Fragment key={`zero${i}`}>
                        {i !== 0 && i % width === 0 && (
                            <div className={styles.newLine}></div>
                        )}
                        <ZeroElement />
                    </Fragment>
                );
            })}
        </div>
    );
};

export default BoardZeroField;
