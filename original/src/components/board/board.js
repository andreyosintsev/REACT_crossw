import React, { useState, useEffect } from "react";
import BoardElement from "../board-element/board-element";

import {  saveBoardToLocalStorage,
          loadBoardFromLocalStorage } from "../../utils/local-storage";

import BoardStyles from "./board.module.css";

const Board = (props) => {
  const { width, height, checkWin, help } = props;
  const [board, setBoard] = useState([]);

  useEffect(() => {
    initBoard(help);
  }, [props]);

  useEffect(() => {
    checkWin(board);
  }, [board]);

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
    saveBoardToLocalStorage(newBoard);
  };

  const initBoard = (help) => {
    console.log('initBoard');
    console.log('help', help);
    const newBoard = loadBoardFromLocalStorage() || [];

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
    } else {

      if (help) {
        console.log(help);
        console.log('xCoord: ', help.pos % width);
        console.log('yCoord: ', Math.floor(help.pos/width));
        console.log('content: ', help.content);

        newBoard[help.pos].xCoord = help.pos % width;
        newBoard[help.pos].yCoord = Math.floor(help.pos/width);
        newBoard[help.pos].content = '' + help.content;
      }

    }

    setBoard(newBoard);
    saveBoardToLocalStorage(newBoard);
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
          <>{(i !== 0) 
            && (i % width === 0) 
            && <div key={`bn${i}`} className={BoardStyles.newLine}></div>}  
            <BoardElement
              key={`be${i}`}
              xCoord  = {item.xCoord}
              yCoord  = {item.yCoord}
              content = {content}
            />                 
          </>
        );
      })}
    </div>
    <div key={`bn${board.length + 1}`} className={BoardStyles.newLine} />
    </>
  );
};

export default Board