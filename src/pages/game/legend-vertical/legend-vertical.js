import { Fragment } from 'react';

import LegendElement from '../legend-element/legend-element';

import LegendVerticalStyles from './legend-vertical.module.css';

const LegendVertical = ({ legend, width }) => {
  return(
    <div key='legendVertical' className={LegendVerticalStyles.vertical_legend}>
      {
        legend.map((item, i) => { 
          return (
            <Fragment key={`lv${i}`}>
            {(i !== 0) 
              && (i % width === 0) 
              && <div className={LegendVerticalStyles.newLine}></div>} 
              <LegendElement 
                text={item}
                xCoord={i % width} 
                yCoord={Math.floor(i / width)}
                />
            </Fragment>
          )
        })
      }
    </div>
  );
};

export default LegendVertical