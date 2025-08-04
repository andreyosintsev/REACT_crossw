export interface IBoard {
  "xCoord": number;
  "yCoord": number;
  "content": string;
}

export interface ITask {
    "id": string,
    "name": string,
    "task": string[],
    "width": string,
    "height": string,
    "image_preview": string,
    "image_solved": string,
    "success": string,
}