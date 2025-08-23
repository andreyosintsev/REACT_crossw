import LegendElement from '../legend-element/legend-element';

import LegendHorizontalStyles from './legend-horizontal.module.css';

const LegendHorizontal = ({ legend, width }) => {
  return(
    <div key='legendHorizontal' className={LegendHorizontalStyles.horizontal_legend}>
      {
        legend.map((item, i) => { 
          return (
            <>
            {(i !== 0) 
              && (i % width === 0) 
              && <div key={`lhn${i}`} className={LegendHorizontalStyles.newLine}></div>}  
            <LegendElement text={item} key={`lh${i}`} xCoord={i % width} yCoord={Math.floor(i/width)}/>
            </>
          )
        })
      }
    </div>
  );
};

export default LegendHorizontal