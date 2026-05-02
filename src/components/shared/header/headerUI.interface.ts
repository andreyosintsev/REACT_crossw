import { IMenuItem } from "../../../types/menu";

interface IHeaderUI {
    siteName: string;
    logo: string;
    menuItems: Array<IMenuItem>;
}

export default IHeaderUI;
