import { useState } from 'react';

import Modal from '../modal/modal';
import ModalButton from '../modal-button/modal-button';

import ControlsStyles from './controls.module.css';

const Controls = ({onRestart, onHelp}) => {
  const [modalShow, setModalShow] = useState(false);

  const restartHandler = (e) => {
    e.preventDefault();
    setModalShow(true);
  };

  const tipHandler = (e) => {
    e.preventDefault();
    onHelp();
  };

  const dialogRestartHandler = (e) => {
    setModalShow(false);
    onRestart(e);
  };

  const dialogCancelHandler = (e) => {
    e.preventDefault();
    setModalShow(false);
  };

  const closeHandler = (e) => {
    e.preventDefault();
    setModalShow(false);
  };

  return (
    <>
      <div className={ControlsStyles.controls}>
        <button className={ControlsStyles.restart} onClick={restartHandler}>Начать заново</button>
        <button className={ControlsStyles.tip} onClick={tipHandler}>Подсказка</button>
      </div>
      {modalShow 
      && <Modal image="modal1.png" title="Вы хотите начать заново?" onClick={closeHandler}>
          <ModalButton onClick={dialogRestartHandler}>Начать заново</ModalButton>
          <ModalButton onClick={dialogCancelHandler}>Отменить</ModalButton>
        </Modal>}
    </>
  );
}

export default Controls