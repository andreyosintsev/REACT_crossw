import { FC } from 'react';

import IPageAds from './page-ads.interface';
import styles from './page-ads.module.scss';

/**
 * @component - Компонент рекламного блока
 * @param {ReactNode} children - Дополнительный контент (опционально)
 * @returns {JSX.Element} Рекламный баннер с возможностью кастомизации
 * 
 * @description
 * Компонент отображает рекламный блок с особенностями:
 * - Поддержка дополнительного контента через children
 * - Семантический alt-атрибут для изображения
 * - Готовые стили для позиционирования
 * 
 * @see IPageAds Интерфейс входных параметров
 */
const PageAds: FC<IPageAds> = ({ children }) => {
  return (
    <div className={styles.ads}>
      <img src="/imgs/banner-300x800.png" alt="Реклама" />
    </div>
  )
}

export default PageAds