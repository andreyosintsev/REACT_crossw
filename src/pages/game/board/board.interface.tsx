import IBoardElement from "../board-element/board-element.interface";

export interface IGameBoardProps {
    width: number;
    height: number;
}

export interface IHelp extends IBoardElement {
    position: number | null;
}