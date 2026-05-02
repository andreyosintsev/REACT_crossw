import IButton from "./button.interface";

import ButtonUI from "./buttonUI";

/**
 * @component Функциональный компонент кнопки для модального окна
 *
 * @param {Object} IButton - Интерфейс пропсов компонента кнопки
 * @param {Function} onClick - Обработчик клика по кнопке
 * @param {ReactNode} children - Текст или контент, отображаемый на кнопке
 *
 * @returns {JSX.Element} Визуализированный компонент кнопки модального окна
 *
 * @description Компонент представляет собой кнопку, которая используется внутри модальных окон
 * для выполнения различных действий (подтверждение, отмена и т.д.)
 */
const Button = ({ onClick, children }: IButton) => <ButtonUI onClick={onClick}>{children}</ButtonUI>;

export default Button;
