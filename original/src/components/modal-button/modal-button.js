import ModalButtonStyles from './modal-button.module.css';

const ModalButton = ({onClick, children}) => {
  return (
    <div className={ModalButtonStyles.button}>
      <button onClick={onClick}>{children}</button>
    </div>
  );
};

export default ModalButton