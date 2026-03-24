import { apiGetNews, apiGetTask, apiGetTasks } from "../../utils/api/api";
import { TBoardElementContent } from "./api.interface";
import { BOARD_ELEMENT_CONTENT_VALUES } from "./../../declarations/constants";

import { TNormalizeTask, TNormalizeNews, TFetchTask, TFetchTasks, TFetchNews, TisBoardElementContent } from "./apiServices.interface";

/**
 * Checks if a given value is a valid board element content.
 *
 * @param {unknown} value - The value to be checked.
 * @return {value is TBoardElementContent} - Returns true if the value is a string and is included in the BOARD_ELEMENT_CONTENT_VALUES array, otherwise returns false.
 */
export const isBoardElementContent: TisBoardElementContent = (value): value is TBoardElementContent => {
    return typeof value === "string" && BOARD_ELEMENT_CONTENT_VALUES.includes(value as TBoardElementContent);
};

const normalizeTask: TNormalizeTask = (task) => {
    const t = task as Record<string, unknown>;

    const width = Number(t.width);
    const height = Number(t.height);

    const expectedLength = width * height;

    let normalizedTask: TBoardElementContent[];

    if (Array.isArray(t.task)) {
        normalizedTask = t.task.map((item) => (item ? item : "0"));

        if (normalizedTask.length !== expectedLength) {
            normalizedTask = new Array(expectedLength).fill("0");
        }
    } else {
        normalizedTask = new Array(expectedLength).fill("0");
    }

    return {
        id: Number(t.id),
        name: String(t.name ?? ""),
        task: normalizedTask,
        width,
        height,
        image_preview: String(t.image_preview ?? ""),
        image_solved: String(t.image_solved ?? ""),
    };
};

const normalizeNews: TNormalizeNews = (news) => {
    const n = news as Record<string, unknown>;

    return {
        date: String(n.date ?? ""),
        text: String(n.text ?? ""),
    };
};

export const fetchTask: TFetchTask = async (taskId: number) => {
    const response = await apiGetTask(taskId);

    return normalizeTask(response);
};

export const fetchTasks: TFetchTasks = async () => {
    const response = await apiGetTasks();

    //Нормализация данных
    return response.tasks.map((task) => normalizeTask(task));
};

export const fetchNews: TFetchNews = async () => {
    const response = await apiGetNews();
    return response.news.map((news) => normalizeNews(news));
};
