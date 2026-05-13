import { ITheme } from "../../../store/storeUser/storeUser.interface";

export interface ILegendHorizontal {
    legend: (number | null)[];
    width: number;
    height: number;
}

export interface ILegendHorizontalProps extends ILegendHorizontal {
    appearance: ITheme;
}
