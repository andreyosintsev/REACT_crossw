
import ModalBackdropStyles from './modal-backdrop.module.css';

const ModalBackdrop = ({onClick}) => {
  return (
    <div className={ModalBackdropStyles.backdrop} onClick={onClick}></div>
  );
};

export default ModalBackdrop