import { FC } from 'react';


import IAppWrapper from './app-wrapper.interface';

import styles from './app-wrapper.module.scss';

const AppWrapper: FC<IAppWrapper> = ({ children }) => {
    return (
        <div className = { styles.wrapper }>
            { children }    
        </div>
    )
}

export default AppWrapper