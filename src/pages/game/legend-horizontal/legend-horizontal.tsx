import { FC } from "react";

import LegendElement from "../legend-element/legend-element";

import styles from "./legend-horizontal.module.scss";
import ILegendHorizontal from "./legend-horizontal.interface";
import DynamicGrid from "../../../components/dynamic-grid/dynamic-grid";

/**
 * Компонент горизонтальной легенды для японского кроссворда
 *
 * @component
 * @param {ILegendHorizontal} props - Свойства компонента
 * @param {(number | null)[]} props.legend - Массив числовых подсказок для горизонтальной легенды
 * @param {number} props.width - Количество столбцов в сетке легенды
 * @param {number} props.height - Количество строк в сетке легенды
 * @returns {JSX.Element} Горизонтальная легенда с числовыми подсказками
 *
 * @description
 * Компонент отображает горизонтальную легенду (подсказки сверху от игрового поля):
 * - Преобразует плоский массив подсказок в двумерную сетку
 * - Автоматически рассчитывает позиции элементов
 * - Использует адаптивную сетку для правильного расположения
 * - Поддерживает значения null для пустых ячеек
 * - Группирует элементы по столбцам для стилизации
 *
 * @example
 * <LegendHorizontal
 *   legend={[1, 2, null, 3, 4, 5]}
 *   width={3}
 *   height={2}
 * />
 */
const LegendHorizontal: FC<ILegendHorizontal> = ({ legend, width, height }) => {
    return (
        <DynamicGrid
            rows={height}
            columns={width}
            className={styles.horizontal_legend}
        >
            {legend.map((item, i) => {
                const rowIndex = i % width;
                return (
                    <LegendElement
                        key={`lh${i}`}
                        text={item}
                        xCoord={i % width}
                        yCoord={Math.floor(i / width)}
                        type={`lh_${rowIndex}`}
                    />
                );
            })}
        </DynamicGrid>
    );
};

export default LegendHorizontal;
