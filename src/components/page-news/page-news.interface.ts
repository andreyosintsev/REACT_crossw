import { INews } from "../../utils/api/api.interface";

export interface INewsLoading {
    isLoading: boolean;
    hasError: boolean;
    news: INews[];
}
