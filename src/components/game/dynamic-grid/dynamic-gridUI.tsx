import styles from "./dynamic-gridUI.module.scss";
import { IDynamicGridUI } from "./dynamic-gridUI.interface";

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

const DynamicGridUI = ({ style, onCellClick, onContextMenu, children, className }: IDynamicGridUI) => {
    return (
        <div className={styles.grid + ` ${className || ""}`} style={style} onMouseDown={onCellClick} onContextMenu={onContextMenu}>
            {children}
        </div>
    );
};

export default DynamicGridUI;
