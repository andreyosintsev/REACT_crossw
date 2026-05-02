interface IDynamicGrid {
    columns: number;          // количество колонок
    rows: number;            // количество строк
    cellWidth?: number;      // ширина ячейки (опционально)
    cellHeight?: number;     // высота ячейки (опционально)
    cellSize?: number | 'auto';       // размер для квадратных ячеек (опционально)
    gap?: number;            // расстояние между ячейками
    onCellClick?: (e: React.MouseEvent) => void;
    onContextMenu?: (e: React.MouseEvent) => void;
    children?: React.ReactNode;
    className?: string;
}

export default IDynamicGrid;