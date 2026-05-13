import { ITheme } from "../../../store/storeUser/storeUser.interface";
export interface ILegendVertical {
    legend: (number | null)[];
    width: number;
    height: number;
}

export interface ILegendVerticalProps extends ILegendVertical {
    appearance: ITheme;
}
