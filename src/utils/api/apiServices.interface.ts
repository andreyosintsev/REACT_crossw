import { ITask, INews, TBoardElementContent } from "../api/api.interface";

export type TisBoardElementContent = (value: unknown) => value is TBoardElementContent;

export type TNormalizeTask = (task: unknown) => ITask;

export type TNormalizeNews = (news: unknown) => INews;

export type TFetchTask = (taskId: number) => Promise<ITask>;

export type TFetchTasks = () => Promise<ITask[]>;

export type TFetchNews = () => Promise<INews[]>;
