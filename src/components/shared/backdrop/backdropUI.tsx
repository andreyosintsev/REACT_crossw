import styles from "./backdropUI.module.scss";

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

interface IBackdrop {
    visible: boolean;
    onClick: (e: React.MouseEvent) => void;
}

const BackdropUI = ({ visible, onClick }: IBackdrop) => {
    const style = visible ? styles.backdrop : styles.backdrop + " " + styles.backdrop__hidden;

    return <div className={style} onClick={onClick}></div>;
};

export default BackdropUI;
