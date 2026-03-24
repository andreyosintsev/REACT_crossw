import { apiGetNews, apiGetTask, apiGetTasks } from "../../utils/api/api";

import { NormalizeTask, NormalizeNews, FetchTask, FetchTasks, FetchNews } from "./apiServices.interface";

const normalizeTask: NormalizeTask = (task) => {
    const t = task as Record<string, unknown>;

    return {
        id: Number(t.id),
        name: String(t.name ?? ""),
        task: Array.isArray(t.task) ? t.task.map(String) : [],
        width: Number(t.width),
        height: Number(t.height),
        image_preview: String(t.image_preview ?? ""),
        image_solved: String(t.image_solved ?? ""),
    };
};

const normalizeNews: NormalizeNews = (news) => {
    const n = news as Record<string, unknown>;

    return {
        date: String(n.date ?? ""),
        text: String(n.text ?? ""),
    };
};

export const fetchTask: FetchTask = async (taskId: number) => {
    const response = await apiGetTask(taskId);

    return normalizeTask(response);
};

export const fetchTasks: FetchTasks = async () => {
    const response = await apiGetTasks();

    //Нормализация данных
    return response.tasks.map((task) => normalizeTask(task));
};

export const fetchNews: FetchNews = async () => {
    const response = await apiGetNews();
    return response.news.map((news) => normalizeNews(news));
};
