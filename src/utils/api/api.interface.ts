export interface INews {
    date: string;
    text: string;
}

export interface ITask {
    id: number;
    name: string;
    task: string[]; //@todo - уточнить тип до '0' | '1' | 'X'
    width: number;
    height: number;
    image_preview: string;
    image_solved: string;
}

export interface ITasks {
    tasks: ITask[];
}

interface IApiResult {
    success: boolean;
}

export interface IApiNews extends IApiResult {
    news: INews[];
}

export interface IApiTask extends ITask {
    success: boolean;
}

export interface IApiTasks extends IApiResult {
    tasks: ITask[];
}
