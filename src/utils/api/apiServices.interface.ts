import { ITask, INews } from "../api/api.interface";

export type NormalizeTask = (task: unknown) => ITask;

export type NormalizeNews = (news: unknown) => INews;

export type FetchTask = (taskId: number) => Promise<ITask>;

export type FetchTasks = () => Promise<ITask[]>;

export type FetchNews = () => Promise<INews[]>;
