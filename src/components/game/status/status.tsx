import { TStatusItem } from "../../../types/game";
import StatusUI from "./statusUI";

const Status = () => {
    const statusItems: TStatusItem[] = [
        {
            key: "Кроссворд",
            value: "№ 1",
        },
        {
            key: "Время",
            value: "01:16",
        },
    ];

    return <StatusUI statusItems={statusItems} />;
};

export default Status;
