import { ICrossword } from "../../store/storeUser/storeUser.interface";

/**
 * Метод задания кроссворда по умолчанию, если кроссворд
 * не был найден в локальном хранилище
 */

export const getDefaultCrossword = (id: number): ICrossword => ({
    solved: false,
    id,
    time: "",
    stars: 0,
});

/**
 * Обновление или добавление кроссворда в стор
 *
 * @param crosswords - массив кроссвордов из стора
 * @param crossword - добавляемый или обновляемый кровссворд
 * @returns обновленный массив кроссвордов для сохранения в стор
 */

export const upsertCrossword = (crosswords: ICrossword[], crossword: ICrossword): ICrossword[] => {
    return crosswords.some((c) => c.id === crossword.id)
        ? crosswords.map((c) => (c.id === crossword.id ? crossword : c))
        : [...crosswords, crossword];
};

/**
 * Поиск кроссворда по id
 *
 * @param crosswords - массив кроссвордов из стора
 * @param id - id кроссворда
 * @returns  - найденный кроссворд или кроссворд по умолчанию
 */

export const findCrosswordById = (crosswords: ICrossword[], id: number): ICrossword => {
    return crosswords.find((c) => c.id === id) ?? getDefaultCrossword(id);
};
