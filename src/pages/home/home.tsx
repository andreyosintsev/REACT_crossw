import { FC, useEffect, } from "react";

import PageBlock from "../../components/page-block/page-block";
import PageSlider from "../../components/page-slider/page-slider";
import PageNews from "../../components/page-news/page-news";

import IHome from "./home.interface";
import styles from "./home.module.scss";

import { SITE_PROTOCOL, SITE_DOMAIN } from "../../declarations/constants";
import { ITask } from "../../utils/api/api.interface";
import useStoreTask from "../../services/useStoreTask/useStoreTask";
import legendStore from "../../services/legendStore/legendStore";

/**
 * Компонент главной страницы приложения с японскими кроссвордами
 * 
 * @component
 * @returns {JSX.Element} Главная страница с описанием, слайдером кроссвордов и новостями
 * 
 * @description
 * Компонент реализует главную страницу приложения с следующими секциями:
 * - Приветственный блок с описанием японских кроссвордов и их истории
 * - Интерактивный слайдер с новыми кроссвордами
 * - Секция для отображения решенных кроссвордов (заглушка для будущего функционала)
 * - Блок с последними новостями сайта
 * - Автоматическая очистка легенд при монтировании
 * 
 * @example
 * // Использование в роутинге
 * <Route path="/" element={<Home />} />
 */
const Home: FC<IHome> = () => {
    // Получаем список задач из глобального хранилища
    const { tasks } = useStoreTask();
    // Получаем функцию очистки легенд из хранилища легенд
    const { clearLegend } = legendStore();

    /**
     * Преобразует массив задач в формат для слайдера изображений
     * @param {ITask[]} tasks - Массив объектов задач кроссвордов
     * @returns {Array<ISliderImage>} Массив объектов для отображения в слайдере
     * 
     * @description
     * Трансформирует данные задач в объекты, понятные компоненту слайдера:
     * - Генерирует полный URL для изображения превью кроссворда
     * - Создает описательный alt-текст для accessibility
     * - Формирует ссылку на страницу конкретного кроссворда
     * 
     * @example
     * // Возвращает массив вида:
     * [{
     *   src: "https://site.com/tasks/image1.jpg",
     *   alt: "Разгадать кроссворд № 1", 
     *   link: "game/1"
     * }]
     */
    const tasksToImages = (tasks: ITask[]) => tasks.map((task) => {
        return {
            src: `${SITE_PROTOCOL}${SITE_DOMAIN}/tasks/${task.image_preview}`,
            alt: `Разгадать кроссворд № ${task.id}`,
            link: `game/${task.id}`,
        };
    })

    /**
     * Эффект очистки легенд при монтировании компонента
     * @dependency [clearLegend] - Зависит от функции очистки легенд
     * 
     * @description
     * Выполняется при монтировании компонента главной страницы:
     * - Очищает глобальные массивы DOM-элементов легенд
     * - Предотвращает потенциальные утечки памяти
     * - Готовит приложение к новому игровому сеансу
     * 
     * @importance
     * Важно очищать легенды при переходе на главную страницу,
     * так как элементы легенд могут сохраняться в памяти после
     * предыдущих игровых сессий
     */
    useEffect(() => {
        clearLegend()
    }, [clearLegend])

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
                <PageSlider images={tasksToImages(tasks)} />
            </PageBlock>
            <PageBlock title={"Решённые кроссворды"}></PageBlock>
            <PageBlock title={"Новости сайта"}>
                <PageNews />
            </PageBlock>
        </main>
    );
};

export default Home;
