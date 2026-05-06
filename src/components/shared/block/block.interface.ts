import { ReactNode } from "react";

interface IBlock {
    title?: string;
    children?: ReactNode;
    variant?: "text" | "slider" | "ads";
}

export default IBlock;
