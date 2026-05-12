import IModal from "./modal.interface";

import styles from "./modalUI.module.scss";

/**
 * @component Визуальный компонент модального окна
 * @description Базовый UI-компонент, отвечающий за отображение модального окна
 * с контентом, заголовком и кнопками управления
 *
 * @param {Object} IModal - Интерфейс пропсов визуального компонента модального окна
 * @param {string} title - Заголовок модального окна
 * @param {string} image - Имя файла изображения для модального окна
 * @param {Function} onClick - Обработчик клика для закрытия модального окна
 * @param {ReactNode} children - Вложенный контент (обычно кнопки)
 *
 * @returns {JSX.Element} Визуализированный компонент модального окна
 */
const ModalUI = ({ title, image, children }: IModal) => (
    <>
        <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <img className={styles.modal__image} src={`/images/${image}`} alt="" />
            <p className={styles.modal__p}>{title}</p>
            <div className={styles.modal__buttons}>{children}</div>
        </div>
    </>
);

export default ModalUI;
