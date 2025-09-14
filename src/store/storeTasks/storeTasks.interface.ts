import { ITask } from "../../utils/api/api.interface";

interface IStoreTask {
    /** Массив задач в хранилище
     * @type {ITask[]}
     * @memberof IStoreTask
     */
    tasks: ITask[];

    /** Устанавливает новый список задач в хранилище
     * @param {ITask[] | null} tasksData - Новый список задач или null
     * @returns {void}
     * @memberof IStoreTask
     */
    setTasks: (tasksData: ITask[] | null) => void;

    /** Получает задачу по её ID
     * @param {number} id - ID задачи для поиска
     * @returns {ITask | null} Найденная задача или null, если задача не найдена
     * @memberof IStoreTask
     */
    getTaskById: (id: number) => ITask | null;
}

export default IStoreTask;
