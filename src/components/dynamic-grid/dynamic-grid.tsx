import { FC } from "react";
import IDynamicGrid from "./dynamic-grid.interface";
import DynamicGridUI from "../ui/dynamic-grid/dynamic-grid";

const DynamicGrid: FC<IDynamicGrid> = ({ columns, rows, cellWidth, cellHeight, cellSize, gap, onCellClick, onContextMenu, children, className }) => {

    const parseSize = (size: number | string | undefined): string => {
        if (size === 'auto') return 'auto';
        if (typeof size === 'number') return `${size}px`;
        return `${24}px`;
    };

    const sizeWidth = parseSize(cellWidth || cellSize);
    const sizeHeight = parseSize(cellHeight || cellSize);
    const sizeGap = `${gap || 0}px`

    const styles = {
        '--columns': `repeat(${columns}, ${sizeWidth})`,
        '--rows': `repeat(${rows}, ${sizeHeight})`,
        '--gap': sizeGap,
    } as React.CSSProperties

    return (<DynamicGridUI style={styles} onCellClick={onCellClick} onContextMenu={onContextMenu} className={className}>{children}</DynamicGridUI>)
}

export default DynamicGrid;