import IPreloader from "./preloader.interface";

import PreloaderUI from "./preloaderUI";

/**
 * @component - Компонент индикатора загрузки
 * @returns {JSX.Element} Анимированный индикатор процесса загрузки
 *
 * @note
 * Для работы требует наличия файла preloader.gif в папке /images
 *
 * @see styles Модуль стилей компонента
 *
 * @description
 * Компонент отображает анимированную GIF-прелоадер с особенностями:
 * - Стандартный индикатор загрузки
 * - Поддержка accessibility (alt-атрибут)
 * - Минималистичный дизайн
 */

const Preloader = ({ image }: IPreloader) => <PreloaderUI image={image} />;

export default Preloader;
