import React from "react";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Menu from "../components/menu";
import ErrorPage from "./error";
import Home from "./home";
import OperationPage from "./operation";
import NavBar from "../components/navbar";
import ExchangePage from "./exchange";
import StatsPage from "./stats";
import CategoryPage from "./stats/category";
import StatisticsPage from "./stats/statistics";

export default function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: (
                <div className="pb-12">
                    <NavBar />
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
                    element: <OperationPage />,
                },
                {
                    path: "income",
                    element: <OperationPage />,
                },
                {
                    path: "stats",
                    element: <StatsPage />,
                    children: [
                        {
                            path: "category?",
                            element: <CategoryPage />,
                            children: [
                                {
                                    path: "expense?",
                                    children: [
                                        {
                                            path: "year",
                                            element: <div>Year</div>,
                                        },
                                        {
                                            path: "month?",
                                            element: <div>Month</div>,
                                            index: true,
                                        },
                                        {
                                            path: "week",
                                            element: <div>Week</div>,
                                        },
                                        {
                                            path: "day",
                                            element: <div>Day</div>,
                                        },
                                    ],
                                },
                                {
                                    path: "income",
                                    children: [
                                        {
                                            path: "year",
                                            element: <div>Year</div>,
                                        },
                                        {
                                            path: "month?",
                                            element: <div>Month</div>,
                                            index: true,
                                        },
                                        {
                                            path: "week",
                                            element: <div>Week</div>,
                                        },
                                        {
                                            path: "day",
                                            element: <div>Day</div>,
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            path: "statistics",
                            element: <StatisticsPage />,
                        },
                    ],
                },
                {
                    path: "exchange",
                    element: <ExchangePage />,
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
