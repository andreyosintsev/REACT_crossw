export interface IDynamicGrid {
    columns: number; // количество колонок
    rows: number; // количество строк
    cellWidth?: number; // ширина ячейки
    cellHeight?: number; // высота ячейки
    cellSize?: number | "auto"; // размер для квадратных ячеек
    gap?: number; // расстояние между ячейками
    onCellClick?: (e: React.MouseEvent) => void;
    onContextMenu?: (e: React.MouseEvent) => void;
    children?: React.ReactNode;
    className?: string;
}
