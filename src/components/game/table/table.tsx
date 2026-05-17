import { useState, useEffect } from "react";
import cn from "classnames";

import { ITask } from "../../../utils/api/api.interface";

import Board from "../board/board";
import LegendHorizontal from "../legend-horizontal/legend-horizontal";
import LegendVertical from "../legend-vertical/legend-vertical";
import Modal from "../../../components/shared/modal/modal";
import ModalButton from "../../../components/shared/button/button";
import DynamicGrid from "../../../components/game/dynamic-grid/dynamic-grid";

import storeGame from "../../../store/storeGame/storeGame";
import storeUser from "../../../store/storeUser/storeUser";

import styles from "./table.module.scss";

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

export interface ITable {
    task: ITask;
}

const Table = ({ task }: ITable) => {
    // Состояние отображения модального окна
    const [modalShow, setModalShow] = useState(false);
    // Получаем состояние и методы из игрового хранилища
    const { horizontalLegend, verticalLegend, setWin, isWin, solved, setGameCompleted } = storeGame();
    // Получаем метод сохранения прогресса из пользовательского хранилища
    const { setCrossword } = storeUser();
    // Внешний вид игрового поля
    const appearance = storeUser((state) => state.userSettings.theme);

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
        if (isWin && !solved) {
            setModalShow(true);
            setCrossword({
                solved: true,
                id: task.id,
                time: "",
                stars: 0,
            });
            setWin(false);
            setGameCompleted(true);
        }
    }, [isWin, task.id, setCrossword, setWin, solved, setGameCompleted]);

    return (
        horizontalLegend &&
        verticalLegend && (
            <>
                <DynamicGrid columns={2} rows={2} cellSize={"auto"} className={styles.table}>
                    <DynamicGrid key="boardZeroField" columns={1} rows={1} className={cn(styles.zero_field, { [styles.win]: solved })} />
                    <LegendHorizontal
                        legend={horizontalLegend.legend}
                        width={horizontalLegend.width}
                        height={horizontalLegend.height}
                        appearance={appearance}
                    />
                    <LegendVertical
                        legend={verticalLegend.legend}
                        width={verticalLegend.width}
                        height={verticalLegend.height}
                        appearance={appearance}
                    />
                    <Board width={task.width} height={task.height} appearance={appearance} />
                </DynamicGrid>
                {modalShow && (
                    <Modal image="modal1.png" title="Поздравляем, вы разгадали кроссворд!">
                        <ModalButton onClick={closeHandler}>Закрыть</ModalButton>
                    </Modal>
                )}
            </>
        )
    );
};

export default Table;
