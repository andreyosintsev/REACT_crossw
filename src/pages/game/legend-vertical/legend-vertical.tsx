import { FC } from "react";

import LegendElement from "../legend-element/legend-element";
import styles from './legend-vertical.module.scss'

import ILegendVertical from "./legend-vertical.interface";
import DynamicGrid from "../../../components/dynamic-grid/dynamic-grid";

/**
 * @component - Компонент вертикальной легенды игрового поля
 * @param {Array<string>} legend - Массив текстовых значений для легенды
 * @param {number} width - Количество элементов в столбце
 * @returns {JSX.Element} Вертикальная легенда с поддержкой переноса столбцов
 *
 * @description
 * Компонент отображает вертикальную легенду игрового поля с возможностями:
 * - Автоматический перенос столбцов согласно указанной высоте (width)
 * - Поддержка пустых значений в массиве legend
 * - Передача координат каждому элементу легенды
 * - Визуальное разделение столбцов
 *
 * @layoutBehavior
 * 1. Элементы располагаются сверху вниз
 * 2. Перенос на новый столбец каждые `width` элементов
 * 3. Между столбцами добавляется разделитель newLine
 *
 * @note
 * Параметр width фактически определяет высоту столбца,
 * так как элементы располагаются вертикально
 *
 * @see LegendElement Компонент элемента легенды
 * @see LegendHorizontal Горизонтальный вариант легенды
 * @see LegendVerticalStyles Стили компонента
 **/
const LegendVertical: FC<ILegendVertical> = ({ legend, width, height }) => {
    return (
        <DynamicGrid rows={height} columns={width} className={styles.vertical_legend}>
            {legend.map((item, i) => {
                return (
                    <LegendElement
                        key={`lv${i}`}
                        text={item}
                        xCoord={i % width}
                        yCoord={Math.floor(i / width)}
                    />
                );
            })}
        </DynamicGrid>
    );
};

export default LegendVertical;
