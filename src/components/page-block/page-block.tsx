import { FC } from 'react';

import IPageBlock from './page-block.interface';
import styles from './page-block.module.scss';

const PageBlock: FC<IPageBlock> = ({ title, children }) => {
<<<<<<< HEAD
    return (
        <div className = { styles.block }>
            {
                title && <h2 className="block__title">{ title }</h2>
            }
            { children }
        </div>
    )
=======
  return (
    <div className = { styles.block }>
      {
        title && <h2 className="block__title">{title}</h2>
      }
      { children }
    </div>
  )
>>>>>>> 65b6eeb (feat<ts>: local-storage moved to ts)
}

export default PageBlock