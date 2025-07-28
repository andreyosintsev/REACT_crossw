import { Fragment } from 'react';
import LegendElement from '../legend-element/legend-element';
import LegendVerticalStyles from './legend-vertical.module.css';

/**
 * @component - Компонент вертикальной легенды игрового поля
 * @param {Array<string>} legend - Массив текстовых значений для легенды
 * @param {number} width - Количество элементов в столбце
 * @returns {JSX.Element} Вертикальная легенда с поддержкой переноса столбцов
 * 
 * @description
 * Компонент отображает вертикальную легенду игрового поля с возможностями:
 * - Автоматический перенос столбцов согласно указанной высоте (width)
 * - Поддержка пустых значений в массиве legend
 * - Передача координат каждому элементу легенды
 * - Визуальное разделение столбцов
 * 
 * @layoutBehavior
 * 1. Элементы располагаются сверху вниз
 * 2. Перенос на новый столбец каждые `width` элементов
 * 3. Между столбцами добавляется разделитель newLine
 * 
 * @note
 * Параметр width фактически определяет высоту столбца,
 * так как элементы располагаются вертикально
 * 
 * @see LegendElement Компонент элемента легенды
 * @see LegendHorizontal Горизонтальный вариант легенды
 * @see LegendVerticalStyles Стили компонента
**/
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