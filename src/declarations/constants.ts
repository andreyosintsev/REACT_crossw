//Домен сайта
export const SITE_DOMAIN = "crossw.ru";

//Протокол стайта
export const SITE_PROTOCOL = "https://";

//Название сайта
export const SITE_NAME = "Японские кроссворды";

//Год создания сайта
export const SITE_YOB = "2024";

//Главное меню
export const SITE_MENU_MAIN = [
    {
        title: "О кроссвордах",
        link: "/about",
    },
    {
        title: "Наши рекордсмены",
        link: "/hiscore",
    },
    {
        title: "Лучшие кроссворды",
        link: "/best",
    },
];

/*
    API
*/

//Новости сайта
export const API_NEWS = "/api/news.php";

//Задача по номеру
export const API_TASK = "/api/task.php";

//Все задачи
export const API_TASKS = "/api/tasks.php";

/*
    ГРАФИКА
*/

//Логотип

export const SITE_LOGO = "/images/logo.png";

//Типы значений в клетках игрового поля
export const BOARD_ELEMENT_CONTENT_VALUES = ["0", "1", "X"] as const;
