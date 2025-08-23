import { FC } from "react";
import styles from './dynamic-grid.module.scss'
import IDynamicGridUI from "./dynamic-grid.interface";

/**
 * @component Компонент динамической сетки UI.
 * @param {object} props - Свойства компонента.
 * @param {React.CSSProperties} [props.style] - Стиль для контейнера.
 * @param {function} [props.onCellClick] - Обработчик клика по ячейке.
 * @param {function} [props.onContextMenu] - Обработчик контекстного меню.
 * @param {React.ReactNode} [props.children] - Дочерние элементы внутри компонента.
 * @param {string} [props.className] - Дополнительные классы для контейнера.
 * 
 * @returns {JSX.Element} - Элемент JSX компонента.
 */
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