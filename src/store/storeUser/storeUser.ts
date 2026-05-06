import { create } from "zustand";
import { IUserStore } from "./storeUser.interface";
import { saveCrosswordToLocalStorage } from "../../utils/local-storage/local-storage";
import { findCrosswordById, upsertCrossword } from "../../utils/game/game";

/**
 * Хранилище Zustand для управления пользовательскими данными
 * @function
 * @returns {IUserStore} Объект хранилища с состоянием и методами
 *
 * @description
 * Централизованное хранилище для управления всеми пользовательскими данными:
 * - Персональная информация
 * - Прогресс по кроссвордам
 * - Настройки приложения
 * - Система рейтинга
 * - Токены аутентификации
 *
 * @example
 * // Использование в компоненте
 * const { name, rating, setRating } = userStore();
 */
const storeUser = create<IUserStore>((set, get) => ({
    name: "",
    email: "",
    dateOfBirth: "",
    crosswords: [],
    rating: 0,
    userSettings: {
        theme: {
            borderElement: {
                border: "",
                colorText: "",
                board: "",
                cellColoring: "",
                width: 0,
                height: 0,
            },
        },
        mailing: false,
    },
    token: "",
    accessToken: "",

    setCrossword: (crossword) => {
        saveCrosswordToLocalStorage(crossword.id, crossword);

        set((state) => ({
            crosswords: upsertCrossword(state.crosswords, crossword),
        }));
    },

    getCrosswordById: (id) => findCrosswordById(get().crosswords, id),

    setRating: (rating) =>
        set({
            rating,
        }),

    setUserInfo: (userInfo) =>
        set({
            name: userInfo.name,
            surName: userInfo.surName,
            email: userInfo.email,
            dateOfBirth: userInfo.dateOfBirth,
            userSettings: userInfo.userSettings,
        }),
}));

export default storeUser;
