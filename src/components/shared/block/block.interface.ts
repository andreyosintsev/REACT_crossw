import { ReactNode } from "react";

interface IBlock {
    title?: string;
    children?: ReactNode;
    variant?: "text" | "slider" | "ads" | "game" | "controls";
}

export default IBlock;
