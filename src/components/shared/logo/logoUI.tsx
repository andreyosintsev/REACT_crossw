import ILogo from "./logo.interface";

import styles from "./logoUI.module.scss";

/**
 * @component Визуальный компонент логотипа страницы
 *
 * @param {Object} ILogo - Интерфейс пропсов компонента логотипа
 * @param {string} image - URL изображения логотипа
 * @param {string} title - Название приложения/сайта
 *
 * @returns {JSX.Element} Визуализированный компонент логотипа
 *
 * @description Базовый UI-компонент, отображающий логотип и название
 * приложения/сайта в едином стилевом решении
 */

const LogoUI = ({ image, title }: ILogo) => {
    return (
        <>
            <img className={styles.logo} src={image} alt={title} />
            <div className={styles.title}>{title}</div>
        </>
    );
};

export default LogoUI;
