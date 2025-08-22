import { FC, useState } from 'react';

import Modal from '../../../components/modal/modal';
import ModalButton from '../../../components/modal-button/modal-button';

import styles from './controls.module.scss';
import IControls from './controls.interface';

/**
 * @component - Компонент панели управления игрой
 * @param {Function} onRestart - Обработчик перезапуска игры
 * @param {Function} onHelp - Обработчик запроса подсказки
 * @returns {JSX.Element} Панель управления с кнопками и модальным окном
 * 
 * @description
 * Компонент предоставляет интерфейс управления игрой:
 * - Кнопка "Начать заново" (с подтверждением через модальное окно)
 * - Кнопка "Подсказка"
 * - Модальное окно подтверждения для перезапуска
 * 
 * @state
 * @property {boolean} modalShow - Состояние видимости модального окна
 * 
 * @method restartHandler - Обработчик клика по кнопке перезапуска
 * @method tipHandler - Обработчик клика по кнопке подсказки
 * @method dialogRestartHandler - Подтверждение перезапуска
 * @method dialogCancelHandler - Отмена перезапуска
 * @method closeHandler - Закрытие модального окна
 * 
 * @see Modal Компонент модального окна
 * @see ModalButton Компонент кнопки модального окна
 * @see styles Стили компонента
 */
const Controls: FC<IControls> = ({ onRestart, onHelp }) => {
    const [modalShow, setModalShow] = useState(false);

    /**
      * Обработчик клика по кнопке "Начать заново"
      * @param {MouseEvent} e - Событие клика
     **/
    const restartHandler = (e: React.MouseEvent) => {
        e.preventDefault();
        setModalShow(true);
    };

    /**
      * Обработчик клика по кнопке "Подсказка"
      * @param {MouseEvent} e - Событие клика
     **/
    const tipHandler = (e: React.MouseEvent) => {
        e.preventDefault();
        onHelp();
    };

    /**
     * Обработчик подтверждения перезапуска
     * @param {MouseEvent} e - Событие клика
    **/
    const dialogRestartHandler = (e: React.MouseEvent) => {
        setModalShow(false);
        onRestart(e);
    };

    /**
     * Обработчик отмены перезапуска
     * @param {MouseEvent} e - Событие клика
    **/
    const dialogCancelHandler = (e: React.MouseEvent) => {
        e.preventDefault();
        setModalShow(false);
    };

    /**
     * Обработчик закрытия модального окна
     * @param {MouseEvent} e - Событие клика
    **/
    const closeHandler = (e: React.MouseEvent) => {
        e.preventDefault();
        setModalShow(false);
    };

    return (
        <>
            <div className={styles.controls}>
                <button className={styles.restart} onClick={restartHandler}>Начать заново</button>
                <button className={styles.tip} onClick={tipHandler}>Подсказка</button>
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