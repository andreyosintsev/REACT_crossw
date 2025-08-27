import { FC, useState, useEffect } from "react";

import PageBlock from "../../components/page-block/page-block";
import PageSlider from "../../components/page-slider/page-slider";
import PageNews from "../../components/page-news/page-news";

import IHome from "./home.interface";
import styles from "./home.module.scss";

import { SITE_PROTOCOL, SITE_DOMAIN } from "../../declarations/constants";
import { ITask } from "../../utils/api/api.interface";
import { useTaskStore } from "../../components/services/storeTask";

/**
 * @component Компонент главной страницы приложения
 * @returns {JSX.Element} Главная страница с описанием, слайдером и новостями
 * 
 * @description
 * Компонент реализует главную страницу приложения с:
 * - Приветственным текстом и описанием нонограмм
 * - Слайдером новых кроссвордов
 * - Секцией для решенных кроссвордов
 * - Блоком новостей сайта
 */
const Home: FC<IHome> = () => {
    // Получаем список задач из глобального хранилища
    const { tasks } = useTaskStore();

    // Локальное состояние для управления отображением задач
    const [tasksLoading, setTasksLoading] = useState<{
        hasError: boolean;
        tasks: ITask[];
    }>({
        hasError: false,
        tasks: [],
    });

    /**
     * Преобразует массив задач в формат для слайдера изображений
     * @param {ITask[]} tasks - Массив задач кроссвордов
     * @returns {Array<{src: string, alt: string, link: string}>} Массив объектов для слайдера
     * 
     * @description
     * Создает массив объектов с данными для отображения в слайдере:
     * - src: URL изображения превью кроссворда
     * - alt: Описание для accessibility
     * - link: Ссылка на страницу игры
     */
    const tasksToImages = (tasks: ITask[]) => tasks.map((task) => {
        return {
            src: `${SITE_PROTOCOL}${SITE_DOMAIN}/tasks/${task.image_preview}`,
            alt: `Разгадать кроссворд № ${task.id}`,
            link: `game/${task.id}`,
        };
    })

    /**
     * Эффект синхронизации задач из глобального хранилища с локальным состоянием
     * @dependency [tasks] - Зависит от глобального списка задач
     * 
     * @description
     * Автоматически обновляет локальное состояние при изменении глобального списка задач:
     * - Копирует задачи из глобального хранилища
     * - Сбрасывает флаг ошибки
     * - Подготавливает данные для отображения
     */
    useEffect(() => {
        if (tasks) {
            setTasksLoading({
                hasError: false,
                tasks: tasks,
            });
        }
    }, [tasks]);

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
