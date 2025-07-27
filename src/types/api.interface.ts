export interface INews {
    date: string;
    text: string;
}

export interface ITask {
    id: number
    name: string;
    task: number[];
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

export interface IApiTask extends IApiResult {
    task: ITask;
}

export interface IApiTasks extends IApiResult {
    tasks: ITask[];
 }