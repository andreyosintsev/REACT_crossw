import {
    SITE_DOMAIN,
    SITE_PROTOCOL,
    API_NEWS,
    API_TASK,
    API_TASKS,
} from "../../declarations/constants";

import { IApiNews, IApiTask, IApiTasks } from "./api.interface";

const checkFetchResponse = <T>(res: Response): Promise<T> => {
    return res.ok ? res.json() : Promise.reject(`Ошибка Fetch: ${res.status}`);
};

const checkSuccess = (data: any): Promise<any> => {
    return data && data.success
        ? data
        : Promise.reject(`Ошибка: Fetch не success: ${data}`);
};

export const apiGetNews = (options?: RequestInit): Promise<IApiNews> => {
    return fetch(`${SITE_PROTOCOL}${SITE_DOMAIN}${API_NEWS}`, options)
        .then(checkFetchResponse)
        .then(checkSuccess);
};

export const apiGetTask = (
    task: number,
    options?: RequestInit
): Promise<IApiTask> => {
    return fetch(
        `${SITE_PROTOCOL}${SITE_DOMAIN}${API_TASK}?task=${task}`,
        options
    )
        .then(checkFetchResponse)
        .then(checkSuccess);
};

export const apiGetTasks = (
    count: string,
    options?: RequestInit
): Promise<IApiTasks> => {
    return fetch(
        `${SITE_PROTOCOL}${SITE_DOMAIN}${API_TASKS}?count=${count}`,
        options
    )
        .then(checkFetchResponse)
        .then(checkSuccess);
};

export function getErrorMessage(error: unknown): string {
    if (error instanceof Error) return error.message;
    if (typeof error === "string") return error;
    return "Неизвестная ошибка";
}
