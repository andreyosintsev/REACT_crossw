import cn from "classnames";

import styles from "./legend-element.module.scss";

import storeLegend from "../../../store/storeLegend/storeLegend";
import { isHorizontalLegendHighlighted, isVerticalLegendHighlighted } from "../../../utils/legends/legends";

/**
 * Компонент элемента легенды для японского кроссворда
 *
 * @component
 * @param {ILegendElement} props - Свойства компонента
 * @param {number | null} props.text - Числовое значение подсказки или null для пустой ячейки
 * @param {number} props.xCoord - X-координата элемента в сетке легенды
 * @param {number} props.yCoord - Y-координата элемента в сетке легенды
 * @param {string} props.dataAttribute - Значение data-атрибута для группировки и стилизации
 * @returns {JSX.Element} Элемент легенды с текстом и оформлением
 *
 * @description
 * Компонент реализует отдельный элемент легенды с особенностями:
 * - Динамическое применение стилей границ на основе координат
 * - Регистрация DOM-элемента в глобальном хранилище для последующего управления
 * - Поддержка пустых значений (null) для выравнивающих ячеек
 * - Групповая стилизация через data-атрибуты
 *
 * @example
 * <LegendElement
 *   text={5}
 *   xCoord={2}
 *   yCoord={3}
 *   dataAttribute="LegendHorizontal_2"
 * />
 */

interface ILegendElement {
    text: number | null;
    xCoord: number;
    yCoord: number;
    type?: string;
}

const LegendElement = ({ text, xCoord, yCoord, type }: ILegendElement) => {
    const highlightedX = storeLegend((state) => state.highlightedX);
    const highlightedY = storeLegend((state) => state.highlightedY);

    const isHorizontal = type?.startsWith("lh_");
    const isVertical = type?.startsWith("lv_");

    const isHighlighted =
        (isHorizontal && isHorizontalLegendHighlighted(xCoord, highlightedX)) ||
        (isVertical && isVerticalLegendHighlighted(yCoord, highlightedY));

    return (
        <div
            className={cn(styles.le, {
                [styles.le_borderRight]: (xCoord + 1) % 5 === 0,
                [styles.le_borderBottom]: (yCoord + 1) % 5 === 0,
                [styles.le_contented]: text !== null,
                [styles.le_hover]: isHighlighted,
            })}
        >
            {text}
        </div>
    );
};

export default LegendElement;
