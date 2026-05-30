import { FC } from "react";
import { Helmet } from "react-helmet-async";
import { loadCrosswordFromLocalStorage } from "../../utils/local-storage/local-storage";

import Page from "../../components/shared/page/page";
import Block from "../../components/shared/block/block";
import Slider from "../../components/home/slider/slider";
import News from "../../components/home/news/news";

import IHome from "./home.interface";

import { SITE_PROTOCOL, SITE_DOMAIN } from "../../declarations/constants";
import { ITask } from "../../utils/api/api.interface";
import storeTasks from "../../store/storeTasks/storeTasks";

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
    const tasks = storeTasks((store) => store.tasks);

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
     *   alt: "Кроссворд № 1",
     *   link: "game/1"
     * }]
     */
    const tasksToImages = (tasks: ITask[]) =>
        tasks.map((task) => {
            return {
                src: `${SITE_PROTOCOL}${SITE_DOMAIN}/tasks/${task.image_preview}`,
                alt: `Кроссворд № ${task.id}`,
                link: `game/${task.id}`,
            };
        });

    const tasksToImagesCompleted = (tasks: ITask[]) =>
        tasks.map((task) => {
            return {
                src: `${SITE_PROTOCOL}${SITE_DOMAIN}/tasks/${task.image_solved}`,
                alt: `№ ${task.id} ${task.name}`,
                link: `game/${task.id}`,
            };
        });

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

    const { tasksCompleted, tasksNotCompleted } = tasks.reduce<{
        tasksCompleted: ITask[];
        tasksNotCompleted: ITask[];
    }>(
        (acc, task) => {
            if (loadCrosswordFromLocalStorage(task.id)?.solved) {
                acc.tasksCompleted.push(task);
            } else {
                acc.tasksNotCompleted.push(task);
            }
            return acc;
        },
        { tasksCompleted: [], tasksNotCompleted: [] },
    );

    return (
        <>
            <Helmet>
                <title>Японские кроссворды онлайн | {SITE_DOMAIN}</title>
                <meta name="description" content="Сайт с коллекцией японских кроссвордов, которые можно разгадывать онлайн" />
            </Helmet>
            <Page>
                <Block>
                    <div className="block__text">
                        <p>
                            <strong>Добро пожаловать на сайт японских кроссвордов.</strong>
                        </p>
                        <p>
                            Японский кроссворд (или нонограмма) - это головоломка, напоминающая привычный кроссворд, однако вместо слов в
                            нём зашифровано изображение.
                        </p>
                        <p>Нонограммы появились в Японии в конце XX века.</p>
                        <p>
                            Нон Исида (яп. 石田 のん), иллюстратор и графический редактор, утверждавшая, что ещё в 1970 году она создавала
                            нонограммы как средство общения между людьми и животными. Нон Исида верила, что животные очень разумные
                            существа, но из-за отсутствия средств коммуникации между людьми и животными человек недооценивает земные
                            существа. В результате её научной работы, по утверждению Исиды, родились нонограммы.
                        </p>
                    </div>
                </Block>
                <Block variant="ads"></Block>
                {tasksNotCompleted.length > 0 && (
                    <Block title={"Новые кроссворды"}>
                        <Slider images={tasksToImages(tasksNotCompleted)} />
                    </Block>
                )}
                {tasksCompleted.length > 0 && (
                    <Block title={"Решенные кроссворды"}>
                        <Slider images={tasksToImagesCompleted(tasksCompleted)} />
                    </Block>
                )}
                <Block title={"Новости сайта"}>
                    <News />
                </Block>
            </Page>
        </>
    );
};

export default Home;
