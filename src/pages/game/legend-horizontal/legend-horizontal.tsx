import { FC } from "react";

import LegendElement from "../legend-element/legend-element";

import styles from "./legend-horizontal.module.scss";
import ILegendHorizontal from "./legend-horizontal.interface";
import DynamicGrid from "../../../components/dynamic-grid/dynamic-grid";

/**
 * @component - Компонент горизонтальной легенды игрового поля
 * @param {Array<string>} legend - Массив текстовых значений для легенды
 * @param {number} width - Ширина легенды (количество элементов в строке)
 * @returns {JSX.Element} Горизонтальная легенда с поддержкой переноса строк
 *
 * @description
 * Компонент отображает горизонтальную легенду игрового поля с возможностями:
 * - Автоматический перенос строк согласно указанной ширине
 * - Поддержка пустых значений в массиве legend
 * - Передача координат каждому элементу легенды
 * - Визуальное разделение строк
 *
 * @layoutBehavior
 * 1. Элементы располагаются слева направо
 * 2. Перенос на новую строку каждые `width` элементов
 * 3. Между строками добавляется разделитель newLine
 *
 * @see LegendElement Компонент элемента легенды
 * @see styles Стили компонента
 **/
const LegendHorizontal: FC<ILegendHorizontal> = ({ legend, width, height }) => {
    return (
        <DynamicGrid rows={height} columns={width} className={styles.horizontal_legend}>
            {legend.map((item, i) => {
                return (
                    <LegendElement
                        key={`lh${i}`}
                        text={item}
                        xCoord={i % width}
                        yCoord={Math.floor(i / width)}
                    />
                );
            })}
        </DynamicGrid>
    );
};

export default LegendHorizontal;
