import { ITask } from "../../../utils/api/api.interface";
import { IHelp } from "../board/board.interface";

export interface ITable {
    task: ITask
    help: IHelp;
}

export interface ILegend {
    legend: (number | null)[];
    width: number;
    height: number;
}

export interface ILegendHorizontal extends ILegend {

}

export interface IVerticalLegend extends ILegend {

}