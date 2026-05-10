import { TBoardElementContent } from "../../../utils/api/api.interface";

export interface IBoardElement {
    xCoord: number;
    yCoord: number;
    content: TBoardElementContent;
}
