import { FC, useEffect } from "react";

import { BrowserRouter } from "react-router-dom";

import AppRouter from "../app-router/app-router";
import { useTaskStore } from "../services/storeTask";

const App: FC = () => {
    const { fetchTasks } = useTaskStore();

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
