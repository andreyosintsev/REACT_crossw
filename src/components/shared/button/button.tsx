import IButton from "./button.interface";

import ButtonUI from "./buttonUI";

/**
 * @component Функциональный компонент кнопки
 *
 * @param {Object} IButton - Интерфейс пропсов компонента кнопки
 * @param {string} className - Имя дополнительного класса кнопки
 * @param {Function} onClick - Обработчик клика по кнопке
 * @param {ReactNode} children - Текст или контент, отображаемый на кнопке
 *
 * @returns {JSX.Element} Визуализированный компонент кнопки модального окна
 *
 * для выполнения различных действий (подтверждение, отмена и т.д.)
 */
const Button = ({ className, onClick, children }: IButton) => (
    <ButtonUI className={className} onClick={onClick}>
        {children}
    </ButtonUI>
);

export default Button;
