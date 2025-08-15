import { FC } from "react";
import IAppFooterUI from "./app-footer.interface";
import styles from "./app-footer.module.scss";

/**
 * @component Визуальный компонент футера приложения
 * 
 * @param {Object} IAppFooterUI - Интерфейс пропсов визуального компонента футера
 * @param {string} appName - Название приложения
 * @param {string} initialReleaseYear - Год основания или период работы сайта
 * @param {string} domain - Доменное имя сайта
 * 
 * @returns {JSX.Element} Визуализированный компонент футера
 * 
 * @description Базовый UI-компонент, отвечающий за отображение информации
 * в нижней части страницы (футере)
 */
const AppFooterUI: FC<IAppFooterUI> = ({
    appName,
    initialReleaseYear,
    domain,
}) => {
    return (
        <footer className={styles.footer}>
            <div className={styles.footer__copy}>
                &copy; {domain} - {appName}, {initialReleaseYear}
            </div>
        </footer>
    );
};

export default AppFooterUI;
