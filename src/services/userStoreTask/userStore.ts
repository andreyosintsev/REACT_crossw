import { create } from "zustand";
import { IUserStore } from "./userStore.interface";
import { saveCrosswordBoardToLocalStorage } from "../../utils/local-storage/local-storage";

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
const userStore = create<IUserStore>((set, get) => ({
    name: "",
    email: "",
    dateOfBirth: "",
    crosswBoards: null,
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

    setCrosswordBoards: (newBoard) => {
        saveCrosswordBoardToLocalStorage(newBoard.id, newBoard);
        set((state) => ({
            crosswBoards: state.crosswBoards
                ? state.crosswBoards.some((b) => b.id === newBoard.id)
                    ? state.crosswBoards.map((b) =>
                          b.id === newBoard.id ? newBoard : b
                      )
                    : [...state.crosswBoards, newBoard]
                : [newBoard],
        }));
    },

    getCrosswordBoardById: (id) => {
        const { crosswBoards } = get();
        return (
            crosswBoards?.find((board) => board.id === id) || {
                gameCompleted: false,
                id: id,
                time: "",
                star: 0,
            }
        );
    },

    setRating: (rating) =>
        set((state) => ({
            rating: state.rating + rating,
        })),

    setUserInfo: (userInfo) =>
        set({
            name: userInfo.name,
            surName: userInfo.surName,
            email: userInfo.email,
            dateOfBirth: userInfo.dateOfBirth,
            userSettings: userInfo.userSettings,
        }),
}));

export default userStore;
