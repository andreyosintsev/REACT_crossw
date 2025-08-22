import IBoardElement from "../board-element/board-element.interface";

export interface IGameBoardProps {
    taskId: number;
    width: number;
    height: number;
    checkWin: (board: IBoardElement[]) => void;
    help: IHelp;
}

export interface IHelp extends IBoardElement {
    position: number | null;
}