import { Fragment } from 'react'; 

import LegendElement from '../legend-element/legend-element';

import LegendHorizontalStyles from './legend-horizontal.module.css';

const LegendHorizontal = ({ legend, width }) => {
  return(
    <div key='legendHorizontal' className={LegendHorizontalStyles.horizontal_legend}>
      {
        legend.map((item, i) => { 
          return (
            <Fragment key={`lh${i}`}>
              {(i !== 0) 
                && (i % width === 0) 
                && <div className={LegendHorizontalStyles.newLine}></div>}  
              <LegendElement text={item} xCoord={i % width} yCoord={Math.floor(i/width)}/>
            </Fragment>
          )
        })
      }
    </div>
  );
};

export default LegendHorizontal