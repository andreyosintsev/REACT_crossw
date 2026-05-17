import { TStatusItem } from "../../../types/game";

import styles from "./statusUI.module.scss";

interface IStatusUI {
    statusItems: TStatusItem[];
}

const StatusUI = ({ statusItems }: IStatusUI) => {
    return (
        <div className={styles.status}>
            {statusItems.map((item) => (
                <div key={item.key} className={styles.status__entry}>
                    <div className={styles.status__title}>{item.title}</div>
                    <div className={styles.status__value}>{item.value}</div>
                </div>
            ))}
        </div>
    );
};

export default StatusUI;
