import { FC, useEffect } from "react";

import { BrowserRouter } from "react-router-dom";

import AppRouter from "../app-router/app-router";
import { useStoreTask } from "../../services/useStoreTask/useStoreTask";

const App: FC = () => {
    useEffect(() => {
        useStoreTask.getState().fetchTasks();
    }, [])

    return (
        <BrowserRouter>
            <AppRouter />
        </BrowserRouter>
    );
};

export default App;
