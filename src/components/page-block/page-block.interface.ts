import { ReactNode } from "react";

interface IPageSidebar {
    title?: string;
    children?: ReactNode;
    variant?: "text" | "slider";
}

export default IPageSidebar;
