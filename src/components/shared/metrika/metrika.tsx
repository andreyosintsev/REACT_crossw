import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { YANDEX_METRIKA_COUNTER } from "../../../declarations/constants";

declare global {
    interface Window {
        ym: (...args: unknown[]) => void;
    }
}

const Metrika = () => {
    const location = useLocation();

    useEffect(() => {
        if (window.ym) {
            window.ym(YANDEX_METRIKA_COUNTER, "hit", location.pathname + location.search);
        }
    }, [location]);

    return null;
};

export default Metrika;
