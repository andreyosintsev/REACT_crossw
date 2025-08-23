import { CSSProperties } from "react";

interface IDynamicGridUI {
    style: CSSProperties;
    onCellClick?: (e: React.MouseEvent) => void;
    onContextMenu?: (e: React.MouseEvent) => void;
    children?: React.ReactNode;
    className?: string;
}

export default IDynamicGridUI;