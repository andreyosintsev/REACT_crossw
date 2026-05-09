import IBoardElement from "../../components/game/board-element/board-element.interface";
import { ITask, TBoardElementContent } from "../../utils/api/api.interface";

interface IHelpCandidate {
    pos: number;
    content: TBoardElementContent;
}

/**
 * Создает массив несовпадающих элементов - "кандидатов на подсказку" candidates
 * по задаче task и полю board и возвращает его
 *  *
 * @param task - задача для разгадывания
 * @param board - текущее поле отгадывания
 * @returns candidates - массив несовпадающих элементов
 */

export const getHelpCandidates = (task: ITask, board: IBoardElement[]): IHelpCandidate[] => {
    const candidates: IHelpCandidate[] = [];

    const length = Math.min(task.task.length, board.length);

    for (let i = 0; i < length; i++) {
        const taskContent = task.task[i];
        const boardContent = board[i]?.content;

        const isWrongFilledCell = taskContent === "0" && boardContent === "1";

        const isMissedFilledCell = taskContent === "1" && (boardContent === "0" || boardContent === "X");

        if (isWrongFilledCell || isMissedFilledCell) {
            candidates.push({
                pos: i,
                content: taskContent,
            });
        }
    }

    return candidates;
};

/**
 * Рандомный выбор из массива кандидатов на подсказку поля и изменение игрового поля так,
 * что бы указанная ячейка была закрашена
 *
 * @param task - задача для разгадывания
 * @param board - текущее поле отгадывания
 * @returns - новый вариант поля с внесенной подсказкой
 */

export const applyRandomHelp = (task: ITask, board: IBoardElement[]): IBoardElement[] => {
    const candidates = getHelpCandidates(task, board);

    if (candidates.length === 0) {
        return board;
    }

    const randomIndex = Math.floor(Math.random() * candidates.length);
    const candidate = candidates[randomIndex];

    return board.map((cell, index) =>
        index === candidate.pos
            ? {
                  ...cell,
                  content: candidate.content,
              }
            : cell,
    );
};
