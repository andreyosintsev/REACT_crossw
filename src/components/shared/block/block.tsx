import IBlock from "./block.interface";

import BlockUI from "./blockUI";

/**
 * @component Функциональный компонент информационного блока страницы
 *
 * @param {Object} IBlock - Интерфейс пропсов компонента информационного блока
 * @param {string} title - Заголовок информационного блока
 * @param {ReactNode} children - Вложенные элементы с контентом блока
 *
 * @returns {JSX.Element} Визуализированный компонент информационного блока с контентом
 *
 * @description Компонент представляет собой контейнер для отображения информационного блока
 * с заголовком и содержимым на странице приложения
 */
const Block = ({ title, children, variant }: IBlock) => (
    <BlockUI title={title} variant={variant}>
        {children}
    </BlockUI>
);

export default Block;
