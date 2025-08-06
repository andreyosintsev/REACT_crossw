import { Fragment, useState, useEffect } from "react";
import BoardElement from "../board-element/board-element";

import { saveBoardToLocalStorage,
         loadBoardFromLocalStorage } from "../../../utils/local-storage/local-storage";

import BoardStyles from "./board.module.css";

/**
 * @component - Компонент игрового поля для кроссворда
 * @param {string} taskId - Номер кроссворда
 * @param {number} width - Ширина игрового поля (в клетках)
 * @param {number} height - Высота игрового поля (в клетках)
 * @param {Function} checkWin - Функция проверки победы
 * @param {Object|null} help - Объект подсказки (опционально)
 * @returns {JSX.Element} Игровое поле
 * 
 * @description
 * Компонент реализует интерактивное игровое поле с возможностью:
 * - ЛКМ - закрасить клетку
 * - ПКМ - поставить крестик
 * - Автосохранение состояния
 * - Загрузку сохранённого состояния
 * - Обработку подсказок
 * 
 * @state
 * @property {Array} board - Массив клеток игрового поля
 * 
 * @method initBoard - инициализирует новое или загружает сохранённое поле
 * @method boardClickHandler - обрабатывает клики по полю
 * 
 * @see BoardElement - дочерний компонент клетки поля
 * @see saveBoardToLocalStorage - для сохранения состояния
 * @see loadBoardFromLocalStorage - для загрузки состояния
 */
const Board = ({ taskId, width, height, checkWin, help }) => {
  const [board, setBoard] = useState([]);

  useEffect(() => {
    initBoard(help);
  }, [help]); // @todo: убирает ошибку перерендеринга, вынося initBoard в отдельный вызов

  /**
   * Обработчик кликов по игровому полю
   * @param {MouseEvent} e - событие мыши
   */
  const boardClickHandler = (e) => {
    e.preventDefault();

    const x = +e.target.dataset.x;
    const y = +e.target.dataset.y;

    let newBoard = [...board];

    switch (e.button) {
      case 0:
        newBoard[y * width + x].content =
          board[y * width + x].content !== "1" ? "1" : "0";
        break;
      case 2:
        newBoard[y * width + x].content =
          board[y * width + x].content !== "X" ? "X" : "0";
        break;
      default:
        newBoard[y * width + x].content =
          board[y * width + x].content !== "X" ? "X" : "0";
    }
    setBoard(newBoard);
    saveBoardToLocalStorage(taskId, newBoard);
  };

  const initBoard = (help) => {
    console.log('BOARD: initBoard');
    console.log('BOARD: help: ', help);
    const newBoard = loadBoardFromLocalStorage(taskId) || [];

    if (newBoard.length === 0) {
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          newBoard.push({
            xCoord: x,
            yCoord: y,
            content: "0"
          });
        }
      }
    }

    if (help) {
      console.log(help);
      console.log('xCoord: ', help.pos % width);
      console.log('yCoord: ', Math.floor(help.pos/width));
      console.log('content: ', help.content);

      newBoard[help.pos].xCoord = help.pos % width;
      newBoard[help.pos].yCoord = Math.floor(help.pos/width);
      newBoard[help.pos].content = '' + help.content;
    }

    setBoard(newBoard);
    saveBoardToLocalStorage(taskId, newBoard);
  };

  return (
    <>
    <div
      className={BoardStyles.board}
      onMouseDown={boardClickHandler}
      onContextMenu={(e) => {
        e.preventDefault();
      }}>

      {board.map((item, i) => {
        //Состояние клетки: '0' - пустая, '1' - закрашенная, 'X' - с крестом
        let content = '';
        
        switch (item.content) {
          case '0': content = BoardStyles.free; break;
          case '1': content = BoardStyles.full; break;
          case 'X': content = BoardStyles.cross; break;
          default : ;
        }

        return (
          <Fragment key={`board${i}`}>
            { (i !== 0) 
                && (i % width === 0) 
                && <div className={BoardStyles.newLine}></div>
            }  
            <BoardElement
              xCoord  = {item.xCoord}
              yCoord  = {item.yCoord}
              content = {content}
            />                 
          </Fragment>
        );
      })}
    </div>
    <div key = { `bn${board.length + 1}` }
         className = { BoardStyles.newLine } />
    </>
  );
};

export default Board