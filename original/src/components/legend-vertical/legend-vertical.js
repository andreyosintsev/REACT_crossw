import LegendElement from '../legend-element/legend-element';

import LegendVerticalStyles from './legend-vertical.module.css';

const LegendVertical = ({ legend, width }) => {
  return(
    <div key='legendVertical' className={LegendVerticalStyles.vertical_legend}>
      {
        legend.map((item, i) => { 
          return (
            <>
            {(i !== 0) 
              && (i % width === 0) 
              && <div key={`lvn${i}`} className={LegendVerticalStyles.newLine}></div>} 
              <LegendElement 
                text={item} 
                key={`lv${i}`} 
                xCoord={i % width} 
                yCoord={Math.floor(i / width)}
                />
            </>
          )
        })
      }
    </div>
  );
};

export default LegendVertical