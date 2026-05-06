import styles from "./pageUI.module.scss";

interface IPageUI {
    children?: React.ReactNode;
}

const PageUI = ({ children }: IPageUI) => {
    return <main className={styles.main}>{children}</main>;
};

export default PageUI;
