import { FC } from 'react';

import IPageLogo from './page-logo.interface';
import styles from './page-logo.module.scss';

/**
 * @component - Компонент логотипа сайта с текстовым названием
 * @param {string} image - URL изображения логотипа
 * @param {string} title - Текстовое название/слоган
 * @returns {JSX.Element} Блок логотипа с изображением и текстом
 * 
 * @description
 * Компонент отображает логотип сайта с особенностями:
 * - Изображение логотипа (любого формата)
 * - Текстовое название/слоган рядом
 * - Семантическая верстка
 * - Поддержка accessibility (alt атрибут)
 * 
 * @styleFeatures
 * 1. Гибкое позиционирование через CSS
 * 2. Отзывчивое поведение
 * 3. Оптимальные отступы между элементами
 * 
 * @see IPageLogo Интерфейс входных параметров
**/
const PageLogo: FC<IPageLogo> = ({ image, title }) => {
  return (
    <>
      <img
        className={styles.logo}
        src={image}
        alt={title}
      />
      <div className={styles.title}>
        {title}
      </div>
    </>
  );
}

export default PageLogo;