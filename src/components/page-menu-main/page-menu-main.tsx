import { FC } from 'react';
import { v4 as uuid } from 'uuid';

import IPageMenuMain from './page-menu-main.interface';
import styles from './page-menu-main.module.scss';

const PageMenuMain: FC<IPageMenuMain> = ({ menuItems }) => {

    return (
        <div className = { styles.menumain }>
            <ul className = { styles.menumain__items }>
                {
                    menuItems.map(menuItem => (
                        <li key = { uuid() } className = { styles.menumain__item }>
                            <a 
                                className = {styles.menumain__link} 
                                href = { menuItem.link}    
                                title={menuItem.title}>

                                { menuItem.title }
                            </a>
                        </li>
                        )
                    )
                }
            </ul>
        </div>
    );
}

export default PageMenuMain