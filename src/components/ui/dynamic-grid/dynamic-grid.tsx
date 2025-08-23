import { FC } from "react";
import styles from './dynamic-grid.module.scss'
import IDynamicGridUI from "./dynamic-grid.interface";

const DynamicGridUI: FC<IDynamicGridUI> = ({ style, onCellClick, onContextMenu, children, className }) => {
    return (
        <div
            className={`${styles.board} ${className || ''}`}
            style={style as React.CSSProperties}
            onMouseDown={onCellClick}
            onContextMenu={onContextMenu}
        >
            {children}
        </div >
    )
}

export default DynamicGridUI;