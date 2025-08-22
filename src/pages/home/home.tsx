import { FC, useState, useEffect } from "react";

import PageBlock from "../../components/page-block/page-block";
import PageSlider from "../../components/page-slider/page-slider";
import PageNews from "../../components/page-news/page-news";

import IHome from "./home.interface";
import styles from "./home.module.scss";

import { apiGetTasks } from "../../utils/api/api";

import { SITE_PROTOCOL, SITE_DOMAIN } from "../../declarations/constants";
import { ITask } from "../../utils/api/api.interface";

/**
 * @component - Главная страница приложения с японскими кроссвордами
 * @returns {JSX.Element} Главная страница приложения
 *
 * @description
 * Компонент реализует главную страницу приложения с:
 * - Приветственным текстом
 * - Слайдером новых кроссвордов
 * - Секцией решенных кроссвордов
 * - Блоком новостей сайта
 *
 * @state
 * @property {Object} tasksLoading - Состояние загрузки задач:
 *   @property {boolean} isLoading - Флаг процесса загрузки
 *   @property {boolean} hasError - Флаг ошибки загрузки
 *   @property {ITask[]} tasks - Массив загруженных задач
 *
 * @method getTasks - загружает задачи с сервера
 * @method tasksToImages - преобразует задачи в формат для слайдера
 *
 * @see PageBlock - компонент блока страницы
 * @see PageSlider - компонент слайдера
 * @see PageNews - компонент новостей
 **/
const Home: FC<IHome> = () => {
    const [tasksLoading, setTasksLoading] = useState<{
        isLoading: boolean;
        hasError: boolean;
        tasks: ITask[];
    }>({
        isLoading: false,
        hasError: false,
        tasks: [],
    });

    /**
     * Загружает задачи с сервера
     * @async
     * @function
     * @throws {Error} При ошибке API-запроса
     **/
    const getTasks = () => {
        setTasksLoading({
            isLoading: true,
            hasError: false,
            tasks: [],
        });

        try {
            apiGetTasks()
                .then((data) => {
                    setTasksLoading({
                        isLoading: false,
                        hasError: false,
                        tasks: data.tasks,
                    });
                })
                .catch((error) => {
                    console.error(`Ошибка Promise: ${error}`);
                    setTasksLoading({
                        isLoading: false,
                        hasError: true,
                        tasks: [],
                    });
                });
        } catch (error) {
            const errorMessage: string =
                error instanceof Error ? error.message : "";
            console.error(`Не удалось получить задачи от API: ${errorMessage}`);
            setTasksLoading({
                isLoading: false,
                hasError: true,
                tasks: [],
            });
        }
    };

    useEffect(() => getTasks, []);

    /**
     * Преобразует массив задач в формат для слайдера
     * @param {ITask[]} tasks - Массив задач
     * @returns {Array<{src: string, alt: string, link: string}>} Массив изображений для слайдера
     **/
    const tasksToImages = (tasks: ITask[]) => tasks.map((task) => {
        return {
            src: `${SITE_PROTOCOL}${SITE_DOMAIN}/tasks/${task.image_preview}`,
            alt: `Разгадать кроссворд № ${task.id}`,
            link: `game/${task.id}`,
        };
    })



    return (
        <main className={styles.main}>
            <PageBlock>
                <p>Добро пожаловать на сайт японских кроссвордов.</p>
                <p>
                    Японский кроссворд (или нонограмма) - это головоломка,
                    напоминающая привычный кроссворд, однако вместо слов в нём
                    зашифровано изображение.
                </p>
                <p>Нонограммы появились в Японии в конце XX века.</p>
                <p>
                    Нон Исида (яп. 石田 のん), иллюстратор и графический
                    редактор, утверждавшая, что ещё в 1970 году она создавала
                    нонограммы как средство общения между людьми и животными.
                    Нон Исида верила, что животные очень разумные существа, но
                    из-за отсутствия средств коммуникации между людьми и
                    животными человек недооценивает земные существа. В
                    результате её научной работы, по утверждению Исиды, родились
                    нонограммы.
                </p>
            </PageBlock>
            <PageBlock title={"Новые кроссворды"}>
                <PageSlider images={tasksToImages(tasksLoading.tasks)} />
            </PageBlock>
            <PageBlock title={"Решённые кроссворды"}></PageBlock>
            <PageBlock title={"Новости сайта"}>
                <PageNews />
            </PageBlock>
        </main>
    );
};

export default Home;
