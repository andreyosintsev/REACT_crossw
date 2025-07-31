import { Fragment } from 'react'; 

import LegendElement from '../legend-element/legend-element';

import LegendHorizontalStyles from './legend-horizontal.module.css';

/**
 * @component - Компонент горизонтальной легенды игрового поля
 * @param {Array<string>} legend - Массив текстовых значений для легенды
 * @param {number} width - Ширина легенды (количество элементов в строке)
 * @returns {JSX.Element} Горизонтальная легенда с поддержкой переноса строк
 * 
 * @description
 * Компонент отображает горизонтальную легенду игрового поля с возможностями:
 * - Автоматический перенос строк согласно указанной ширине
 * - Поддержка пустых значений в массиве legend
 * - Передача координат каждому элементу легенды
 * - Визуальное разделение строк
 * 
 * @layoutBehavior
 * 1. Элементы располагаются слева направо
 * 2. Перенос на новую строку каждые `width` элементов
 * 3. Между строками добавляется разделитель newLine
 * 
 * @see LegendElement Компонент элемента легенды
 * @see LegendHorizontalStyles Стили компонента
**/
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