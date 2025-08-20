import { ReactNode } from "react";

interface IModal {
    title: string;
    image: string;
    onClick: (e: React.MouseEvent) => void;
    children: ReactNode;
}

export default IModal;
