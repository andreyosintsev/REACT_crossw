import cn from "classnames";

import { TControlItem } from "../../../types/game";

import Button from "../../shared/button/buttonUI";
import styles from "./controlsUI.module.scss";

interface IControlsUI {
    controlItems: TControlItem[];
}

const ControlsUI = ({ controlItems }: IControlsUI) => {
    console.log("controlItems: ", controlItems);
    return (
        <div className={styles.controls}>
            {controlItems.map((item) => {
                if (item.type === "button") {
                    return (
                        <Button
                            key={item.key}
                            className={cn(
                                styles.controls__button,
                                item.buttonClassName && styles[`controls__button_${item.buttonClassName}`],
                            )}
                            tooltip={item.tooltip}
                            onClick={item.onClick}
                        >
                            <img className={styles.controls__image} src={item.image} alt={item.alt} />
                        </Button>
                    );
                } else if (item.type === "separator") {
                    return <div key={item.key} className={styles.controls__separator}></div>;
                } else return null;
            })}
        </div>
    );
};

export default ControlsUI;
