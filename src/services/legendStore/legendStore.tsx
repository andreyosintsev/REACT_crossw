import { create } from "zustand";
import ILegendStore from "./legendStore.interface";

// Глобальные массивы для хранения DOM-элементов легенд вне хранилища
let legendHorizontalElements: HTMLDivElement[] = [];
let legendVerticalElements: HTMLDivElement[] = [];

/**
 * Хранилище Zustand для управления элементами легенд игрового поля
 * @function
 * @returns {ILegendStore} Объект хранилища с методами управления легендами
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
const legendStore = create<ILegendStore>((set, get) => ({


    // Вспомогательная функция для подсветки легенд
    highlightLegends: (event) => {
        const target = event.currentTarget as HTMLDivElement;

        const x = Number(target.dataset.x);
        const y = Number(target.dataset.y);

        // Убираем предыдущие выделения
        legendHorizontalElements.forEach(ele => ele.classList.remove('le_hover'));
        legendVerticalElements.forEach(ele => ele.classList.remove('le_hover'));

        // Находим и выделяем соответствующие элементы
        legendHorizontalElements.forEach(ele =>
            ele.dataset.type === `LegendHorizontal_${x}` && ele.classList.add('le_hover')
        );
        legendVerticalElements.forEach(ele =>
            ele.dataset.type === `LegendVertical_${y}` && ele.classList.add('le_hover')
        );
    },

    getLegendElement: (div) => {
        if (div?.dataset.type?.includes("LegendHorizontal")) {
            legendHorizontalElements.push(div);
        } else {
            legendVerticalElements.push(div);
        }
    },

    clearLegend: () => {
        legendVerticalElements = [];
        legendHorizontalElements = [];
    },
}))

export default legendStore;