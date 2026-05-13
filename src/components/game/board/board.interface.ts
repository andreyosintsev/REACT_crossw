import { ITheme } from "../../../store/storeUser/storeUser.interface";
import { IBoardElement } from "../board-element/board-element.interface";

export interface IBoard {
    width: number;
    height: number;
}

export interface IBoardProps extends IBoard {
    appearance: ITheme;
}

export interface IHelp extends IBoardElement {
    position: number | null;
}
