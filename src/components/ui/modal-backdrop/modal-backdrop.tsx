import { FC } from "react";
import styles from "./modal-backdrop.module.scss";
import IModalBackdrop from "../../modal-backdrop/modal-backdrop.interface";

/**
 * @component Визуальный компонент подложки модального окна
 * 
 * @param {Object} IModalBackdrop - Интерфейс пропсов компонента подложки
 * @param {Function} onClick - Обработчик клика для закрытия модального окна
 * 
 * @returns {JSX.Element} Визуализированный компонент подложки
 * 
 * @description Базовый UI-компонент, представляющий собой затемняющую подложку
 * которая появляется при открытии модального окна и обеспечивает его закрытие
 * при клике вне содержимого
 */
const ModalBackdropUI: FC<IModalBackdrop> = ({ onClick }) => (
    <div className={styles.backdrop} onClick={onClick}></div>
);

export default ModalBackdropUI;
