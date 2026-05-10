import { FC } from "react";
import IDynamicGrid from "./dynamic-grid.interface";
import DynamicGridUI from "./dynamic-gridUI";

/**
 * @component Динамический грид-компонент с настраиваемой сеткой
 * @param {IDynamicGrid} props - Свойства компонента
 * @param {number} props.columns - Количество колонок в сетке
 * @param {number} props.rows - Количество строк в сетке
 * @param {number | string} [props.cellWidth] - Ширина ячейки (число в px или 'auto')
 * @param {number | string} [props.cellHeight] - Высота ячейки (число в px или 'auto')
 * @param {number | string} [props.cellSize] - Общий размер ячейки (ширина и высота)
 * @param {number} [props.gap] - Расстояние между ячейками в пикселях
 * @param {Function} [props.onCellClick] - Обработчик клика по ячейке
 * @param {Function} [props.onContextMenu] - Обработчик контекстного меню ячейки
 * @param {ReactNode} props.children - Дочерние элементы для размещения в сетке
 * @param {string} [props.className] - Дополнительные CSS-классы
 * @returns {JSX.Element} Динамическая сетка с заданными параметрами
 *
 * @description
 * Компонент создает адаптивную CSS Grid сетку с возможностью:
 * - Настройки количества колонок и строк
 * - Задания размеров ячеек (отдельно width/height или общий size)
 * - Контроля расстояний между ячейками (gap)
 * - Обработки пользовательских событий
 * - Кастомизации через CSS-классы
 *
 * @priority
 * 1. cellWidth / cellHeight - индивидуальные размеры
 * 2. cellSize - общий размер (если не указаны индивидуальные)
 * 3. Значение по умолчанию - 24px
 */
const DynamicGrid = ({
    columns,
    rows,
    cellWidth,
    cellHeight,
    cellSize,
    gap,
    onCellClick,
    onContextMenu,
    children,
    className,
}: IDynamicGrid) => {
    const parseSize = (size: number | string | undefined): string => {
        if (size === "auto") return "auto";
        if (typeof size === "number") return `${size}px`;
        return `${24}px`;
    };

    const sizeWidth = parseSize(cellWidth ?? cellSize);
    const sizeHeight = parseSize(cellHeight ?? cellSize);
    const sizeGap = `${gap ?? 0}px`;

    const style: React.CSSProperties = {
        ["--columns" as string]: `repeat(${columns}, ${sizeWidth})`,
        ["--rows" as string]: `repeat(${rows}, ${sizeHeight})`,
        ["--gap" as string]: sizeGap,
    };

    return (
        <DynamicGridUI style={style} onCellClick={onCellClick} onContextMenu={onContextMenu} className={className}>
            {children}
        </DynamicGridUI>
    );
};

export default DynamicGrid;
