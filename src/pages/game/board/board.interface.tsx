export interface IGameBoardProps {
    taskId: number;
    width: number;
    height: number;
    checkWin: (board: IBoard[]) => void;
    help?: IHelp | null;
}

export interface IBoard {
    xCoord: number;
    yCoord: number;
    content: string;
}

export interface IHelp {
    pos: number;
    content: string | number;
    x?: number;
}