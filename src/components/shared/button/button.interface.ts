import { ReactNode } from "react";

interface IButton {
    onClick: (e: React.MouseEvent) => void;
    children: ReactNode;
}

export default IButton;
