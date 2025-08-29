import { FC, useEffect } from "react";

import { BrowserRouter } from "react-router-dom";

import AppRouter from "../app-router/app-router";
import { useStoreTask } from "../../services/useStoreTask/useStoreTask";

const App: FC = () => {
    const { fetchTasks } = useStoreTask();

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks])

    return (
        <BrowserRouter>
            <AppRouter />
        </BrowserRouter>
    );
};

export default App;
