import { apiGetNews, apiGetTask, apiGetTasks } from "../../utils/api/api";

export const fetchTask = async (taskId: number) => {
    return apiGetTask(taskId);
};

export const fetchTasks = async () => {
    const response = await apiGetTasks();
    return response.tasks;
};

export const fetchNews = async () => {
    const response = await apiGetNews();
    return response.news || [];
};
