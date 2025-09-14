import { useState, useEffect, FC } from "react";

import Board from "../board/board";
import LegendHorizontal from "../legend-horizontal/legend-horizontal";
import LegendVertical from "../legend-vertical/legend-vertical";
import Modal from "../../../components/modal/modal";
import ModalButton from "../../../components/modal-button/modal-button";

import styles from "./table.module.scss";
import { ITable } from "./table.interface";
import DynamicGrid from "../../../components/dynamic-grid/dynamic-grid";
import { storeGame } from "../../../store/storeGame/storeGame";
import storeUser from "../../../store/storeUser/storeUser";

/**
 * Компонент таблицы игрового поля с легендами и модальными окнами
 *
 * @component
 * @param {ITable} props - Свойства компонента
 * @param {ITask} props.task - Объект задачи кроссворда
 * @returns {JSX.Element} Игровое поле с легендами и управлением состоянием победы
 *
 * @description
 * Компонент реализует основную игровую таблицу с:
 * - Динамической сеткой расположения элементов
 * - Горизонтальными и вертикальными легендами
 * - Игровым полем
 * - Обработкой победы и отображением модального окна
 * - Интеграцией с пользовательским прогрессом
 *
 * @example
 * <Table task={currentTask} />
 */
const Table: FC<ITable> = ({ task }) => {
    // Состояние отображения модального окна
    const [modalShow, setModalShow] = useState(false);
    // Получаем состояние и методы из игрового хранилища
    const { horizontalLegend, verticalLegend, setWin, isWin, gameCompleted, setGameCompleted } = storeGame();
    // Получаем метод сохранения прогресса из пользовательского хранилища
    const { setCrosswordBoards } = storeUser();

    /**
     * Обрабатывает закрытие модального окна
     * @param {React.MouseEvent} e - Событие клика
     * @returns {void}
     */
    const closeHandler = (e: React.MouseEvent) => {
        e.preventDefault();
        setModalShow(false);
    };

    /**
     * Эффект обработки победы в игре
     * @dependency [isWin, task.id, gameCompleted] - Зависит от состояния победы и ID задачи
     *
     * @description
     * Автоматически срабатывает при изменении состояния победы:
     * - Показывает модальное окно победы
     * - Сохраняет информацию о завершении кроссворда
     * - Сбрасывает флаг победы
     * - Устанавливает статус завершения игры
     *
     * @logic
     * Срабатывает только при первой победе (!gameCompleted)
     * для предотвращения повторных сохранений
     */
    useEffect(() => {
        if (isWin && !gameCompleted) {
            setModalShow(true);
            setCrosswordBoards({
                gameCompleted: true,
                id: task.id,
                time: "",
                star: 0,
            });
            setWin(false);
            setGameCompleted(true);
        }
    }, [isWin, task.id, setCrosswordBoards, setWin, gameCompleted, setGameCompleted]);

    return (
        horizontalLegend &&
        verticalLegend && (
            <>
                <DynamicGrid columns={2} rows={2} cellSize={"auto"} className={styles.table}>
                    <DynamicGrid
                        key="boardZeroField"
                        columns={1}
                        rows={1}
                        className={`${styles.zero_field} ${gameCompleted ? styles.win : ""}`}
                    />
                    <LegendHorizontal legend={horizontalLegend.legend} width={horizontalLegend.width} height={horizontalLegend.height} />
                    <LegendVertical legend={verticalLegend.legend} width={verticalLegend.width} height={verticalLegend.height} />
                    <Board width={task.width} height={task.height} />
                </DynamicGrid>
                {modalShow && (
                    <Modal image="modal1.png" title="Поздравляем, вы разгадали кроссворд!" onClick={closeHandler}>
                        <ModalButton onClick={closeHandler}>Закрыть</ModalButton>
                    </Modal>
                )}
            </>
        )
    );
};

export default Table;
