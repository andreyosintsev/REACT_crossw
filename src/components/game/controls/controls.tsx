import { useState } from "react";

import { TControlItem } from "../../../types/game";

import Button from "../../../components/shared/button/button";
import Modal from "../../../components/shared/modal/modal";
import ControlsUI from "./controlsUI";

import storeGame from "../../../store/storeGame/storeGame";
import storeUser from "../../../store/storeUser/storeUser";

import styles from "./controls.module.scss";

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

const Controls = () => {
    const onHelp = storeGame((state) => state.giveHint);
    const onRestart = storeGame((state) => state.restartGame);

    const onSizeUp = storeUser((state) => state.sizeUp);
    const onSizeDown = storeUser((state) => state.sizeDown);

    // Состояние видимости модального окна подтверждения
    const [modalShow, setModalShow] = useState(false);
    // Получаем состояние и методы из игрового хранилища
    const { setGameCompleted, setWin } = storeGame();

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
    const dialogRestartHandler = () => {
        setModalShow(false);
        onRestart();
        setGameCompleted(false);
        setWin(false);
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

    const controlItems: TControlItem[] = [
        {
            type: "button",
            key: "size-up",
            tooltip: "Увеличить клетки",
            image: "/images/buttons/size-up.svg",
            alt: "Уменьшить клетки",
            onClick: onSizeUp,
        },
        {
            type: "button",
            key: "size-down",
            tooltip: "Уменьшить клетки",
            image: "/images/buttons/size-down.svg",
            alt: "Увеличить клетки",
            onClick: onSizeDown,
        },
        {
            type: "separator",
            key: "separator-1",
        },
        {
            type: "button",
            key: "help",
            tooltip: "Взять подсказку",
            image: "/images/buttons/help.svg",
            alt: "Подсказка",
            onClick: onHelp,
        },
        {
            type: "separator",
            key: "separator-2",
        },
        {
            type: "button",
            key: "restart",
            tooltip: "Начать заново",
            image: "/images/buttons/restart.svg",
            alt: "Перезапуск",
            onClick: restartHandler,
        },
    ];

    return (
        <>
            <ControlsUI controlItems={controlItems} />
            {modalShow && (
                <Modal image="modal1.png" title="Вы хотите начать заново?">
                    <Button className={styles.button_modal} onClick={dialogRestartHandler}>
                        Начать заново
                    </Button>
                    <Button className={styles.button_modal} onClick={dialogCancelHandler}>
                        Отменить
                    </Button>
                </Modal>
            )}
        </>
    );
};

export default Controls;
