import React from "react";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import BottomBar from "../components/bottombar";
import ErrorPage from "./error";
import Home from "./home";
import OperationPage from "./operation";
import NavBar from "../layouts/navbar";
import ExchangePage from "./exchange";
import StatsPage from "./stats";
import CategoryPage from "./stats/category";
import StatisticsPage from "./stats/statistics";
import LoginWrapper from "../layouts/wrapper/login";
import WelcomePage from "./welcome";
import LoginPage from "./login";
import CategoryListPage, {
    CategoryListLoader as CategoryListLoader,
} from "./settings/category";
import WalletSettingsPage from "./settings/wallet";
import PaymentSettingsPage from "./settings/payment";
import NotificationSettingsPage from "./settings/notification";
import OtherSettingsPage from "./settings/other";
import CategorySettingsItemPage, {
    CategoryItemLoader,
} from "./settings/category/id";
import CategoryArrangementPage from "./settings/category/arrangement";
import CreateWalletPage from "./settings/wallet/create";

export default function App() {
    const router = createBrowserRouter([
        {
            path: "welcome",
            element: <WelcomePage />,
            errorElement: <ErrorPage />,
        },
        {
            path: "login",
            element: <LoginPage />,
            errorElement: <ErrorPage />,
        },
        {
            path: "/",
            element: (
                <LoginWrapper>
                    <div className="pb-12">
                        <NavBar />
                        <Outlet />
                        <BottomBar />
                    </div>
                </LoginWrapper>
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
                            children: [
                                {
                                    path: "expense?",
                                    children: [
                                        {
                                            path: "year",
                                            element: <CategoryPage />,
                                        },
                                        {
                                            path: "month?",
                                            element: <CategoryPage />,
                                            index: true,
                                        },
                                        {
                                            path: "week",
                                            element: <CategoryPage />,
                                        },
                                        {
                                            path: "day",
                                            element: <CategoryPage />,
                                        },
                                    ],
                                },
                                {
                                    path: "income",
                                    children: [
                                        {
                                            path: "year",
                                            element: <CategoryPage />,
                                        },
                                        {
                                            path: "month?",
                                            element: <CategoryPage />,
                                            index: true,
                                        },
                                        {
                                            path: "week",
                                            element: <CategoryPage />,
                                        },
                                        {
                                            path: "day",
                                            element: <CategoryPage />,
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
                {
                    path: "settings",
                    children: [
                        {
                            path: "category",
                            children: [
                                {
                                    path: "arrangement",
                                    element: <CategoryArrangementPage />,
                                    loader: CategoryListLoader,
                                },
                                {
                                    path: ":id",
                                    element: <CategorySettingsItemPage />,
                                    loader: CategoryItemLoader,
                                },
                                {
                                    element: <CategoryListPage />,
                                    index: true,
                                    loader: CategoryListLoader,
                                },
                            ],
                        },
                        {
                            path: "wallet",
                            children: [
                                {
                                    element: <WalletSettingsPage />,
                                    index: true,
                                },
                                {
                                    path: "new",
                                    element: <CreateWalletPage />,
                                },
                            ],
                        },
                        {
                            path: "payment",
                            element: <PaymentSettingsPage />,
                        },
                        {
                            path: "notification",
                            element: <NotificationSettingsPage />,
                        },
                        {
                            path: "currency",
                            element: <NotificationSettingsPage />,
                        },
                        {
                            path: "other",
                            element: <OtherSettingsPage />,
                        },
                    ],
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
