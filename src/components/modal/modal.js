import ReactDOM from 'react-dom';

import ModalBackdrop from '../modal-backdrop/modal-backdrop';

import ModalStyles from './modal.module.css';

/**
 * @component - Компонент модального (диалогового) окна
 * @param {string} title - Заголовок модального окна
 * @param {string} image - Путь к изображению (относительно /imgs/)
 * @param {Function} onClick - Обработчик закрытия модалки
 * @param {ReactNode} children - Дочерние элементы (обычно кнопки)
 * @returns {ReactPortal} Модальное окно, рендерящееся в отдельный DOM-узел
 * 
 * @description
 * Компонент реализует модальное окно с:
 * - Заголовком и изображением
 * - Затемненным фоном
 * - Кастомными кнопками действий
 * - Рендерингом через портал в #modals
 * - Защитой от всплытия кликов
 * 
 * @portalBehavior
 * 1. Ищет DOM-элемент с id="modals"
 * 2. Рендерит модалку через ReactDOM.createPortal
 * 3. Позволяет избежать проблем с z-index
 * 
 * @see ModalBackdrop Компонент фона модалки
 * @see ModalButton Компонент кнопки модалки
**/
const Modal = ({ title, image, onClick, children }) => {
  const modalRoot = document.querySelector("#modals");

  return ReactDOM.createPortal(
    (
      <>
        <ModalBackdrop onClick={onClick} />
        <div className={`${ModalStyles.modal}`} onClick={e => e.stopPropagation()}>
          <img src={`/imgs/${image}`} alt="picword" />
          <p>{title}</p>
          <div className={`${ModalStyles.buttons}`}>
            {children}
          </div>
        </div>
      </>
    ),
    modalRoot
  );
};

export default Modal