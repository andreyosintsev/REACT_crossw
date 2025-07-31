import PreloaderStyles from './preloader.module.css';

/**
 * @component - Компонент индикатора загрузки
 * @returns {JSX.Element} Анимированный индикатор процесса загрузки
 * 
 * @description
 * Компонент отображает анимированную GIF-прелоадер с особенностями:
 * - Стандартный индикатор загрузки
 * - Поддержка accessibility (alt-атрибут)
 * - Минималистичный дизайн
 * 
 * @note
 * Для работы требует наличия файла preloader.gif в папке /imgs
 * 
 * @see PreloaderStyles Модуль стилей компонента
 */
function Preloader() {
  return (
    <div className={PreloaderStyles.preloader}>
      <img src={`/imgs/preloader.gif`} alt="Загрузка"/>
    </div>
  )
}

export default Preloader