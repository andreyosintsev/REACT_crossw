import LegendElementStyles from './legend-element.module.css';

/**
 * @component - Компонент элемента легенды игрового поля
 * @param {string} text - Текст для отображения в элементе
 * @param {number} xCoord - X-координата элемента (горизонталь)
 * @param {number} yCoord - Y-координата элемента (вертикаль)
 * @returns {JSX.Element} Элемент легенды с текстом и границами
 * 
 * @description
 * Компонент отображает элемент легенды игрового поля с особенностями:
 * - Отображает переданный текст (если есть)
 * - Добавляет правую границу для каждого 5-го элемента по горизонтали
 * - Добавляет нижнюю границу для каждого 5-го элемента по вертикали
 * - Добавляет специальные стили для элементов с текстом
 * 
 * @styleLogic
 * 1. Все элементы получают базовый стиль 'le'
 * 2. Каждый 5-й элемент по X получает 'border_right'
 * 3. Каждый 5-й элемент по Y получает 'border_bottom'
 * 4. Элементы с текстом получают 'contented'
 * 
 * @see LegendElementStyles Модуль стилей компонента
 * @see BoardElement Аналогичный компонент игрового поля
 */
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