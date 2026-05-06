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

interface IFooterUI {
    appName: string;
    dob: string;
    domain: string;
    children?: React.ReactNode;
}

const FooterUI = ({ appName, dob, domain, children }: IFooterUI) => {
    return (
        <footer className={styles.footer}>
            <div className={styles.footer__copy}>
                &copy; {domain} - {appName}, {dob}
            </div>
            <div className={styles.footer__ads}>{children}</div>
        </footer>
    );
};

export default FooterUI;
