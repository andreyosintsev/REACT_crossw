import { FC, useState } from 'react';

import Modal from '../../../components/modal/modal';
import ModalButton from '../../../components/modal-button/modal-button';

import styles from './controls.module.scss';
import IControls from './controls.interface';
import { gameStoreControl } from '../../../services/gameStoreControl/gameStoreControl';

/**
 * Компонент панели управления игровым процессом
 * 
 * @component
 * @param {IControls} props - Свойства компонента
 * @param {Function} props.onRestart - Обработчик перезапуска игры
 * @param {Function} props.onHelp - Обработчик запроса подсказки
 * @returns {JSX.Element} Панель управления с кнопками и модальным окном подтверждения
 * 
 * @description
 * Компонент предоставляет интерфейс для управления игровым процессом:
 * - Кнопка перезапуска игры с подтверждением
 * - Кнопка запроса подсказки
 * - Модальное окно подтверждения перезапуска
 * - Блокировка подсказок после завершения игры
 * 
 * @example
 * <Controls 
 *   onRestart={handleRestart} 
 *   onHelp={handleHelp} 
 * />
 */
const Controls: FC<IControls> = ({ onRestart, onHelp }) => {
    // Состояние видимости модального окна подтверждения
    const [modalShow, setModalShow] = useState(false);
    // Получаем состояние и методы из игрового хранилища
    const { gameCompleted, setGameCompleted, setWin } = gameStoreControl();


    /**
     * Обработчик клика по кнопке "Начать заново"
     * @param {React.MouseEvent} e - Событие клика
     * @returns {void}
     * 
     * @description
     * Открывает модальное окно подтверждения перезапуска игры
     * Не выполняет непосредственный перезапуск до подтверждения
     */
    const restartHandler = (e: React.MouseEvent) => {
        e.preventDefault();
        setModalShow(true);
    };

    /**
     * Обработчик клика по кнопке "Подсказка"
     * @param {React.MouseEvent} e - Событие клика
     * @returns {void}
     * 
     * @description
     * Вызывает переданную функцию запроса подсказки
     * Заблокирован после завершения игры
     */
    const tipHandler = (e: React.MouseEvent) => {
        e.preventDefault();
        onHelp();
    };

    /**
     * Обработчик подтверждения перезапуска игры
     * @param {React.MouseEvent} e - Событие клика
     * @returns {void}
     * 
     * @description
     * Выполняет полный сброс игрового состояния:
     * - Закрывает модальное окно
     * - Вызывает переданную функцию перезапуска
     * - Сбрасывает статус завершения игры
     * - Сбрасывает флаг победы
     */
    const dialogRestartHandler = (e: React.MouseEvent) => {
        setModalShow(false);
        onRestart(e);
        setGameCompleted(false)
        setWin(false)
    };

    /**
     * Обработчик отмены перезапуска игры
     * @param {React.MouseEvent} e - Событие клика
     * @returns {void}
     * 
     * @description
     * Закрывает модальное окно без выполнения каких-либо действий
     * Игровой процесс продолжается без изменений
     */
    const dialogCancelHandler = (e: React.MouseEvent) => {
        e.preventDefault();
        setModalShow(false);
    };

    /**
     * Обработчик закрытия модального окна по клику на фон
     * @param {React.MouseEvent} e - Событие клика
     * @returns {void}
     * 
     * @description
     * Закрывает модальное окно при клике на затемненный фон
     * Аналогично отмене перезапуска
     */
    const closeHandler = (e: React.MouseEvent) => {
        e.preventDefault();
        setModalShow(false);
    };

    return (
        <>
            <div className={styles.controls}>
                <button className={styles.restart} onClick={restartHandler}>Начать заново</button>
                <button className={`${styles.tip} ${gameCompleted && styles.blocked}`} onClick={tipHandler}>Подсказка</button>
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
