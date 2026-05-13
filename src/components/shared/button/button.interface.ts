import { ReactNode } from "react";

interface IButton {
    className?: string;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    tooltip?: string;
    children: ReactNode;
}

export default IButton;
