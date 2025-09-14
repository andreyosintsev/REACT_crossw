import ReactDOM from 'react-dom';

import ModalBackdrop from '../modal-backdrop/modal-backdrop';

import ModalStyles from './modal.module.css';

const Modal = ({title, image, onClick, children}) => {
  const modalRoot = document.querySelector("#modals");

  return ReactDOM.createPortal(
    (
      <>
        <ModalBackdrop onClick={onClick} />
        <div className={`${ModalStyles.modal}`} onClick={e => e.stopPropagation()}>
          <img src={`/imgs/${image}`} alt="picword"/>
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