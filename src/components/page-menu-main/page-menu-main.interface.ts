interface IMenuItem {
    title: string;
    link: string;
}

interface IPageMenuMain {
    menuItems: Array<IMenuItem>;
}

export default IPageMenuMain;
