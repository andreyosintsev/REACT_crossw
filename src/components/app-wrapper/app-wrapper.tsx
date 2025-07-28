import { FC } from 'react';


import IAppWrapper from './app-wrapper.interface';

import styles from './app-wrapper.module.scss';

/**
 * @component - Компонент-обертка для основного содержимого приложения
 * @param {ReactNode} children - Дочерние элементы приложения
 * @returns {JSX.Element} Контейнер для основного контента приложения
 * 
 * @description
 * Компонент предоставляет базовый контейнер для:
 * - Централизации стилей layout
 * - Обеспечения единого отступа/фона
 * - Группировки основного содержимого
 * - Создания общего контекста стилизации
 * 
 * @styleFeatures
 * 1. Базовые стили для всего приложения
 * 2. Единые отступы и выравнивание
 * 3. Гибкая система наследования стилей
 * 
 * @note
 * Должен быть корневым элементом или находиться близко к корню приложения
 * 
 * @see IAppWrapper Интерфейс входных параметров
 * @see styles Модуль CSS-стилей
**/
const AppWrapper: FC<IAppWrapper> = ({ children }) => {
    return (
        <div className = { styles.wrapper }>
            { children }    
        </div>
    )
}

export default AppWrapper