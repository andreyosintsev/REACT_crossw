import { FC } from "react";
import PreloaderUI from "../../preloader/preloader";

/**
 * @component Обёртка для прелоадера
 * 
 * @returns {JSX.Element} Визуализированный прелоадер
 * 
 * @description Простая обёртка-компонент для отображения прелоадера
 * во время загрузки контента
 */
const Preloader: FC = () => (<PreloaderUI />)

export default Preloader;
