import { ITask } from "../../utils/api/api.interface";

/**
 * @interface Интерфейс хранилища задач
 */
interface IStoreTask {
    /** Текущая задача */
    task: ITask | null;
    /** Список всех задач */
    tasks: ITask[];
    /** Флаг загрузки */
    isLoading: boolean;
    /** Сообщение об ошибке */
    error: string | null;
    /** Функция загрузки конкретной задачи */
    fetchTask: (taskId: number) => void;
    /** Функция загрузки всех задач */
    fetchTasks: () => void;
    /** Функция установки текущей задачи */
    setTask: (taskData: ITask | null) => void;
    /** Функция установки списка задач */
    setTasks: (tasksData: ITask[] | null) => void;
    /** Функция поиска задачи по ID */
    getTaskById: (id: string) => ITask | null;
}

export default IStoreTask;
