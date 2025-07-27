import { FC } from 'react';

import IPageBlock from './page-block.interface';
import styles from './page-block.module.scss';

const PageBlock: FC<IPageBlock> = ({ title, children }) => {
    return (
        <div className = { styles.block }>
            {
                title && <h2 className="block__title">{ title }</h2>
            }
            { children }
        </div>
    )
}

export default PageBlock