import React from "react";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Dashboard from "../layouts/dashboard";
import Menu from "../components/menu";
import ErrorPage from "./error";

export default function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: (
                <div>
                    <Outlet />
                    <Menu />
                </div>
            ),
            errorElement: <ErrorPage />,
            children: [
                {
                    path: "home",
                    element: <Dashboard />,
                },
                {
                    path: "expense",
                    element: <span>Expenses</span>,
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
