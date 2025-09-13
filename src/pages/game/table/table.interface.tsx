import { ITask } from "../../../utils/api/api.interface";

export interface ITable {
    task: ITask
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