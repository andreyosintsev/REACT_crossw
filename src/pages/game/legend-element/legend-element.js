import React from 'react';

import LegendElementStyles from './legend-element.module.css';

const LegendElement = ({text, xCoord, yCoord}) => {
  let style = '';
  if ((xCoord + 1) % 5 === 0) {style = LegendElementStyles['border_right'];}
  if ((yCoord + 1) % 5 === 0) {style += ' ' + LegendElementStyles['border_bottom'];}
  if (text) {style += ' ' + LegendElementStyles['contented'];}
  return (
    <div className={`${LegendElementStyles.le} ${style} `}>
        {text}
    </div>
  );
};

export default LegendElement