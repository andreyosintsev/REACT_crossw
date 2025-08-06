import { FC } from "react";
import { Link } from "react-router-dom";

import IAppHeader from "./app-header.interface";
import styles from "./app-header.module.scss";

import PageLogo from "../page-logo/page-logo";
import PageMenuMain from "../page-menu-main/page-menu-main";

import { SITE_LOGO } from "../../declarations/constants";
import { SITE_MENU_MAIN } from "../../declarations/constants";

const AppHeader: FC<IAppHeader> = ({ siteName }) => {
    return (
        <header className={styles.header}>
            <div className={styles.header__wrapper}>
                <div className={styles.headertitle}>
                    <Link
                        className={styles.headertitle__link}
                        to="/"
                        title="На главную"
                    >
                        <PageLogo image={SITE_LOGO} title={siteName} />
                    </Link>
                </div>
                <PageMenuMain menuItems={SITE_MENU_MAIN} />
            </div>
        </header>
    );
};

export default AppHeader;
