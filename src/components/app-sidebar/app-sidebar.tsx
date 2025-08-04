import { FC } from 'react';

import IAppSidebar from './app-sidebar.interface';
import styles from './app-sidebar.module.scss';

<<<<<<< HEAD
=======
/**
 * @component - Компонент боковой панели приложения
 * @param {ReactNode} children - Дочерние элементы панели (меню, виджеты и т.д.)
 * @returns {JSX.Element} - Семантически размеченная боковая панель
 * 
 * @description
 * Компонент реализует боковую панель с:
 * - Семантическим HTML-тегом <aside>
 * - Поддержкой произвольного содержимого
 * - Готовыми стилями позиционирования
 * - Интеграцией с основной структурой приложения
 * 
 * @semantics
 * 1. Использует тег <aside> для второстепенного контента
 * 2. Подходит для навигации, виджетов, доп. информации
 * 
 * @see IAppSidebar Интерфейс входных параметров
 * @see AppWrapper Основной контейнер приложения
 */
>>>>>>> 65b6eeb (feat<ts>: local-storage moved to ts)
const AppSidebar: FC<IAppSidebar> = ({ children }) => {
    return (
        <aside className = { styles.sidebar }>
            { children }
        </aside>
    )
}

export default AppSidebar