import React from "react";
import { FC } from "react";

import { SITE_DOMAIN } from "../../declarations/constants";
import { SITE_YOB } from "../../declarations/constants";

import IAppFooter from "./app-footer.interface";

import styles from "./app-footer.module.scss";

const AppFooter: FC<IAppFooter> = ({ siteName }) => {
    const currYear = new Date().getFullYear().toString(10);
    const yearString =
        currYear === SITE_YOB ? SITE_YOB : SITE_YOB + " - " + currYear;

    return (
        <footer className={styles.footer}>
            <div className={styles.footer__copy}>
                &copy; {SITE_DOMAIN} - {siteName}, {yearString}
            </div>
        </footer>
    );
};

export default AppFooter;
