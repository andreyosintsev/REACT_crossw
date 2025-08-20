import { ReactNode } from "react";

interface IModalButton {
    onClick: (e: React.MouseEvent) => void;
    children: ReactNode;
}

export default IModalButton;