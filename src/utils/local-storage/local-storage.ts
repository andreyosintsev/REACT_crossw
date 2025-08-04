import { IBoard, ITask } from './local-storage.interface';
import { BOARD_PREFIX, TASK_PREFIX } from './local-storage.constants';

export const saveBoardToLocalStorage = (boardId: number, board: IBoard[]): void => {
  localStorage.setItem(`${BOARD_PREFIX}${boardId}`, JSON.stringify(board));
}

export const loadBoardFromLocalStorage = (boardId: number): string | null => {
  const board = localStorage.getItem(`${BOARD_PREFIX}${boardId}`);
  return board ? JSON.parse(board) : null;
}

export const clearBoardInLocalStorage = (boardId: number): void => {
  localStorage.removeItem(`${BOARD_PREFIX}${boardId}`);
}

export const saveTaskToLocalStorage = (taskId: number, task: ITask): void => {
  localStorage.setItem(`${TASK_PREFIX}${taskId}`, JSON.stringify(task));
}

export const loadTaskFromLocalStorage = (taskId: number): ITask | null => {
  const task = localStorage.getItem(`${TASK_PREFIX}${taskId}`);
  return task ? JSON.parse(task) : null;
}

export const clearTaskInLocalStorage = (taskId: number): void => {
  localStorage.removeItem(`${TASK_PREFIX}${taskId}`);
}