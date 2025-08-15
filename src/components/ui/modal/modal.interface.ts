import { ReactNode } from "react";

interface IModal {
    title: string;
    image: string;
    onClick: () => void;
    children: ReactNode;
}

export default IModal;
