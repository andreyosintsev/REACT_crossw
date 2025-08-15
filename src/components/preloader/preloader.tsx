import { FC } from "react";
import styles from "./preloader.module.scss";

/**
 * @component - Компонент индикатора загрузки
 * @returns {JSX.Element} Анимированный индикатор процесса загрузки
 *
 * @note
 * Для работы требует наличия файла preloader.gif в папке /imgs
 *
 * @see styles Модуль стилей компонента
 * 
 * @description
 * Компонент отображает анимированную GIF-прелоадер с особенностями:
 * - Стандартный индикатор загрузки
 * - Поддержка accessibility (alt-атрибут)
 * - Минималистичный дизайн
 */
const PreloaderUI: FC = () => {
    return (
        <div className={styles.preloader}>
            <img src={`/imgs/preloader.gif`} alt="Загрузка" />
        </div>
    );
};

export default PreloaderUI;
