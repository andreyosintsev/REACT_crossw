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
 *
 * @note
 * Внимание: используется глобальное состояние (переменные вне хранилища)
 * для максимальной производительности при частых DOM-операциях
 *
 * @example
 * // Использование в компоненте
 * const { highlightLegends, getLegendElement } = legendStore();
 */
const storeLegend = create<IStoreLegend>((set, get) => ({
    // Глобальные массивы для хранения DOM-элементов легенд вне хранилища
    legendHorizontalElements: [],
    legendVerticalElements: [],

    // Вспомогательная функция для подсветки легенд
    highlightLegends: (event) => {
        const target = event.currentTarget as HTMLDivElement;

        const x = Number(target.dataset.x);
        const y = Number(target.dataset.y);

        // Убираем предыдущие выделения
        get().legendHorizontalElements.forEach((ele) =>
            ele.classList.remove("le_hover")
        );
        get().legendVerticalElements.forEach((ele) =>
            ele.classList.remove("le_hover")
        );

        // Находим и выделяем соответствующие элементы
        get().legendHorizontalElements.forEach(
            (ele) =>
                ele.dataset.type === `lh_${x}` && ele.classList.add("le_hover")
        );
        get().legendVerticalElements.forEach(
            (ele) =>
                ele.dataset.type === `lv_${y}` && ele.classList.add("le_hover")
        );
    },

    addLegendElement: (div) => {
        if (div?.dataset.type?.includes("lh")) {
            set({
                legendHorizontalElements:
                    get().legendHorizontalElements.concat(div),
            });
        } else {
            set({
                legendVerticalElements:
                    get().legendVerticalElements.concat(div),
            });
        }
    },

    clearLegend: () =>
        set({ legendVerticalElements: [], legendHorizontalElements: [] }),
}));

export default storeLegend;
