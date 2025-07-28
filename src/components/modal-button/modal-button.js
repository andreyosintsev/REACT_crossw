import ModalButtonStyles from './modal-button.module.css';

/**
 * @component - Компонент кнопки для модальных окон
 * @param {Function} onClick - Обработчик клика по кнопке
 * @param {ReactNode} children - Содержимое кнопки (текст/иконка)
 * @returns {JSX.Element} Стилизованная кнопка для модального окна
 * 
 * @description
 * Компонент реализует стилизованную кнопку с:
 * - Готовыми стилями для модальных окон
 * - Поддержкой любого содержимого
 * - Обработчиком клика
 * - Контейнером для дополнительного стилевого контроля
 * 
 * @styleFeatures
 * 1. Единый стиль для всех модальных кнопок
 * 2. Эффекты при наведении и нажатии
 * 3. Гибкая работа с содержимым
 * 
 * @see ModalButtonStyles Модуль стилей кнопки
**/
const ModalButton = ({onClick, children}) => {
  return (
    <div className={ModalButtonStyles.button}>
      <button onClick={onClick}>{children}</button>
    </div>
  );
};

export default ModalButton