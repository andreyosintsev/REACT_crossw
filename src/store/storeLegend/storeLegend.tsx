import { create } from "zustand";
import IStoreLegend from "./storeLegend.interface";

/**
 * Хранилище Zustand для управления элементами легенд игрового поля
 * @function
 * @returns {IStoreLegend} Объект хранилища с методами управления легендами
 *
 * @description
 * Специализированное хранилище для координации визуального взаимодействия
 * между игровым полем и легендами. Использует глобальные переменные
 * для хранения DOM-элементов, что обеспечивает высокую производительность.
 */
const storeLegend = create<IStoreLegend>((set) => ({
    // Координаты подсвеченного столбца и строки легенды
    highlightedX: null,
    highlightedY: null,

    // Метод установки текущих подсвеченного столбца и строки легенды
    setHighlightedLegend: (xCoord, yCoord) => {
        set({
            highlightedX: xCoord,
            highlightedY: yCoord,
        });
    },

    // Метод очистки подсвеченных элементов легенд
    clearHighlightedLegend: () => {
        set({
            highlightedX: null,
            highlightedY: null,
        });
    },
}));

export default storeLegend;
