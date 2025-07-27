import { Fragment, useState, useEffect } from 'react';
import ZeroElement from '../board-zero-element/board-zero-element';

import BoardZeroFieldStyles from './board-zero-field.module.css';

const BoardZeroField = ({ width, height}) => {

  const [zeroField, setZeroField] = useState([]);

  const createZeroField = (width, height) => {

    let zeroField = [];
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        zeroField.push('');
      }
    }
    setZeroField(zeroField);
  };

  useEffect(() => {
    createZeroField(width, height);
  }, []);

  return(
    <div key='boardZeroField' className={BoardZeroFieldStyles.zero_field}>
      {zeroField.map((item, i) => {
        return (
          <Fragment key={`zero${i}`}>
            {(i !== 0) 
            && (i % width === 0) 
            && <div className={BoardZeroFieldStyles.newLine}></div>}  
            <ZeroElement />
          </Fragment>
        );
      })}
    </div>
  );
}

export default BoardZeroField