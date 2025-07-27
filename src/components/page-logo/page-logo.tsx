import { FC } from 'react';

import IPageLogo from './page-logo.interface';
import styles from './page-logo.module.scss';

const PageLogo: FC<IPageLogo> = ({ image, title }) => {
    return (
        <>
            <img
                className = { styles.logo }
                src = { image }
                alt = { title }
            />
            <div className = { styles.title }>
                { title }
            </div>
        </>
    );
}

export default PageLogo;