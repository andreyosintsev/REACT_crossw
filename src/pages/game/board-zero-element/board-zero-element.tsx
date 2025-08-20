import { FC } from "react";
import styles from "./board-zero-element.module.scss";

/**
 * @component Компонент пустого элемента интерфейса
 * @returns {JSX.Element} Пустой div с заданными стилями
 *
 * @description
 * Компонент представляет собой пустой div элемент с предустановленными стилями.
 * Используется для:
 * - Заполнителя пространства
 * - Визуального разделения элементов
 * - Выравнивания компоновки
 *
 * @note
 * Компонент не принимает props и не содержит логики,
 * только стили из модуля ZeroElementStyles
 *
 * @see styles Модуль стилей для компонента
 */
const ZeroElement: FC = () => {
    return <div className={`${styles.zero}`}></div>;
};

export default ZeroElement;
