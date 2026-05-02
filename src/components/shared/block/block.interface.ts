import { ReactNode } from "react";

interface IBlock {
    title?: string;
    children?: ReactNode;
    variant?: "text" | "slider";
}

export default IBlock;
