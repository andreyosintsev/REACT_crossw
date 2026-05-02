import IFooterUI from "./footerUI.interface";

import styles from "./footerUI.module.scss";

/**
 * @component Визуальный компонент футера приложения
 *
 * @param {Object} IFooterUI - Интерфейс пропсов визуального компонента футера
 * @param {string} appName - Название приложения
 * @param {string} initialReleaseYear - Год основания или период работы сайта
 * @param {string} domain - Доменное имя сайта
 *
 * @returns {JSX.Element} Визуализированный компонент футера
 *
 * @description Базовый UI-компонент, отвечающий за отображение информации
 * в нижней части страницы (футере)
 */
const FooterUI = ({ appName, initialReleaseYear, domain }: IFooterUI) => {
    return (
        <footer className={styles.footer}>
            <div className={styles.footer__copy}>
                &copy; {domain} - {appName}, {initialReleaseYear}
            </div>
        </footer>
    );
};

export default FooterUI;
