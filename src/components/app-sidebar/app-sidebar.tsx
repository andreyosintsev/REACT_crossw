import { FC } from 'react';

import IAppSidebar from './app-sidebar.interface';
import styles from './app-sidebar.module.scss';

const AppSidebar: FC<IAppSidebar> = ({ children }) => {
    return (
        <aside className = { styles.sidebar }>
            { children }
        </aside>
    )
}

export default AppSidebar