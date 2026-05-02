import IPreloader from "./preloader.interface";

import styles from "./preloaderUI.module.scss";

/**
 * @component Визуальный компонент прелоадера
 *
 * @returns {JSX.Element} Визуализированный прелоадер
 *
 * @description Простая обёртка-компонент для отображения прелоадера
 * во время загрузки контента
 */

const PreloaderUI = ({ image }: IPreloader) => {
    return (
        <div className={styles.preloader}>
            <img src={image} alt="Загрузка" />
        </div>
    );
};

export default PreloaderUI;
