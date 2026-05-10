/**
 * Интерфейс хранилища для управления легендами игрового поля
 * @interface
 */
interface IStoreLegend {
    /**Подсвеченный столбец*/
    highlightedX: number | null;
    /**Подсвеченная строка*/
    highlightedY: number | null;

    /**
     * Устанавливает подсветку легенд
     * @param {number} xCoord - координата X клетки
     * @param {number} yCoord - координата Y клетки
     * @returns {void}
     *
     */
    setHighlightedLegend: (xCoord: number, yCoord: number) => void;

    /**
     * Очищает подсветку легенд
     */
    clearHighlightedLegend: () => void;
}

export default IStoreLegend;
