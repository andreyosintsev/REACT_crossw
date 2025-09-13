import { FC, useEffect, useRef } from "react";

import styles from "./legend-element.module.scss";
import ILegendElement from "./legend-element.interface";
import legendStore from "../../../services/legendStore/legendStore";

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
const LegendElement: FC<ILegendElement> = ({ text, xCoord, yCoord, type }) => {
    // Получаем функцию регистрации элемента из хранилища легенд
    const { addLegendElement } = legendStore();
    // Ref для доступа к DOM-элементу
    const ref = useRef<HTMLDivElement | null>(null);

    /**
     * Формирует строку CSS-классов на основе координат и содержания
     * @type {string}
     *
     * @logic
     * - Правая граница: для каждого 5-го элемента по X
     * - Нижняя граница: для каждого 5-го элемента по Y
     * - Стиль содержимого: если элемент не пустой (text !== null)
     */
    let style = "";

    // Добавляем правую границу для каждого 5-го элемента по горизонтали
    if ((xCoord + 1) % 5 === 0) {
        style = styles["border_right"];
    }

    // Добавляем нижнюю границу для каждого 5-го элемента по вертикали
    if ((yCoord + 1) % 5 === 0) {
        style += " " + styles["border_bottom"];
    }

    // Добавляем стиль для элементов с содержимым
    if (text) {
        style += " " + styles["contented"];
    }

    /**
     * Эффект регистрации DOM-элемента в хранилище
     * @dependency [] - Запускается единожды при монтировании
     *
     * @description
     * После монтирования компонента регистрирует DOM-элемент
     * в глобальном хранилище для последующего управления:
     * - Подсветка при наведении на клетки поля
     * - Групповая анимация
     * - Синхронизация состояния
     */
    useEffect(() => {
        if (ref.current) {
            addLegendElement(ref.current);
        }
    }, []);

    return (
        <div ref={ref} className={`${styles.le} ${style}`} data-type={type}>
            {text}
        </div>
    );
};

export default LegendElement;
