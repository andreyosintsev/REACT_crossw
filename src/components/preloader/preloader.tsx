import { FC } from "react";

import PreloaderUI from "../ui/preloader/preloader";

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

const Preloader: FC = () => <PreloaderUI />;

export default Preloader;
