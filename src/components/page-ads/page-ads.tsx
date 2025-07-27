import { FC } from 'react';

import IPageAds from './page-ads.interface';
import styles from './page-ads.module.scss';

const PageAds: FC<IPageAds> = ({ children }) => {
    return (
        <div className = { styles.ads }>
            <img src="/imgs/banner-300x800.png" alt="Реклама"/>
        </div>
    )
}

export default PageAds