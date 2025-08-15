import { IMenuItem } from "../../page-menu-main/page-menu-main.interface";

interface IAppHeaderUI {
    siteName: string;
    logo: string;
    menuItems: Array<IMenuItem>;
}

export default IAppHeaderUI;
