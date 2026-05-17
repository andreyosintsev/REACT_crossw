import { TStatusItem } from "../../../types/game";
import StatusUI from "./statusUI";

interface IStatus {
    taskNumber: number;
}

const Status = ({ taskNumber }: IStatus) => {
    const statusItems: TStatusItem[] = [
        {
            key: "crossword",
            title: "Кроссворд",
            value: `№ ${taskNumber}`,
        },
        // {
        //     key: "Время",
        //     value: "01:16",
        // },
    ];

    return <StatusUI statusItems={statusItems} />;
};

export default Status;
