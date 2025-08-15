import { FC } from "react";

import styles from "./preloader.module.scss";

/**
 * @component Визуальный компонент прелоадера
 *
 * @returns {JSX.Element} Визуализированный прелоадер
 *
 * @description Простая обёртка-компонент для отображения прелоадера
 * во время загрузки контента
 */

const PreloaderUI: FC = () => {
    return (
        <div className={styles.preloader}>
            <img src={`/imgs/preloader.gif`} alt="Загрузка" />
        </div>
    );
};

export default PreloaderUI;
