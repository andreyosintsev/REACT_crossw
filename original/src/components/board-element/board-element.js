import React from 'react';

import BoardElementStyles from './board-element.module.css';

const BoardElement = ({xCoord, yCoord, content}) => {
  let style = '';
  if ((xCoord + 1) % 5 === 0) {style = BoardElementStyles['border_right'];}
  if ((yCoord + 1) % 5 === 0) {style += ' ' + BoardElementStyles['border_bottom'];}
  return (
    <div 
      key={`bel${xCoord*yCoord}`}
      className={`${BoardElementStyles.be} ${content} ${style}`}
      data-x={xCoord}
      data-y={yCoord}>
    </div>
  );
};

export default BoardElement