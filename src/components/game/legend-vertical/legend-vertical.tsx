import styles from "./legend-vertical.module.scss";

import { ILegendVerticalProps } from "./legend-vertical.interface";

import DynamicGrid from "../../../components/game/dynamic-grid/dynamic-grid";
import LegendElement from "../legend-element/legend-element";

/**
 * Компонент вертикальной легенды для японского кроссворда
 *
 * @component
 * @param {ILegendVertical} props - Свойства компонента
 * @param {(number | null)[]} props.legend - Массив числовых подсказок для вертикальной легенды
 * @param {number} props.width - Количество столбцов в сетке легенды
 * @param {number} props.height - Количество строк в сетке легенды
 * @returns {JSX.Element} Вертикальная легенда с числовыми подсказками
 *
 * @description
 * Компонент отображает вертикальную легенду (подсказки слева от игрового поля):
 * - Преобразует плоский массив подсказок в двумерную сетку
 * - Автоматически рассчитывает позиции элементов
 * - Использует адаптивную сетку для правильного расположения
 * - Поддерживает значения null для пустых ячеек
 *
 * @example
 * <LegendVertical
 *   legend={[1, 2, null, 3, 4, 5]}
 *   width={2}
 *   height={3}
 * />
 */

const LegendVertical = ({ legend, width, height, appearance }: ILegendVerticalProps) => {
    return (
        <DynamicGrid rows={height} columns={width} className={styles.legendVertical} cellSize={appearance.boardElement.size}>
            {legend.map((item, i) => {
                const columnIndex = Math.floor(i / width);
                return (
                    <LegendElement
                        key={`lv${i}`}
                        text={item}
                        xCoord={i % width}
                        yCoord={Math.floor(i / width)}
                        type={`lv_${columnIndex}`}
                    />
                );
            })}
        </DynamicGrid>
    );
};

export default LegendVertical;
