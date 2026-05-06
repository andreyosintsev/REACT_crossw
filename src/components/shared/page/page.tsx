import PageUI from "./pageUI";

interface IPage {
    children?: React.ReactNode;
}

const Page = ({ children }: IPage) => {
    return <PageUI>{children}</PageUI>;
};

export default Page;
