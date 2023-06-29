import React from "react";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Menu from "../components/menu";
import ErrorPage from "./error";
import Home from "./home";
import Expense from "./expense";

export default function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: (
                <div className="pb-12">
                    <Outlet />
                    <Menu />
                </div>
            ),
            errorElement: <ErrorPage />,
            children: [
                {
                    element: <Home />,
                    index: true,
                },
                {
                    path: "expense",
                    element: <Expense />,
                },
                {
                    path: "income",
                    element: <span>Incomes</span>,
                },
                {
                    path: "stats",
                    element: <span>Stats</span>,
                },
                {
                    path: "exchange",
                    element: <span>Exchange</span>,
                },
            ],
        },
    ]);

    return (
        <React.StrictMode>
            <RouterProvider router={router} />
        </React.StrictMode>
    );
}
