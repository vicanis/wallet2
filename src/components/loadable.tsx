import React, { ReactNode, useEffect } from "react";
import {
    Await,
    useAsyncError,
    useLoaderData,
    useNavigate,
} from "react-router-dom";
import LoadingLayout from "../layouts/loading";
import Blur from "./blur";
import { AuthError } from "../lib/auth";

export default function LoadablePage({
    renderer,
}: {
    renderer: (data: any) => ReactNode;
}) {
    const { data } = useLoaderData() as { data: any };

    return (
        <React.Suspense
            fallback={
                <Blur>
                    <LoadingLayout>Загрузка данных ...</LoadingLayout>
                </Blur>
            }
        >
            <Await resolve={data} errorElement={<ErrorElement />}>
                {renderer}
            </Await>
        </React.Suspense>
    );
}

function ErrorElement() {
    const navigate = useNavigate();

    const error = useAsyncError() as Error;

    useEffect(() => {
        if (error instanceof AuthError) {
            navigate("/login");
        }
    }, [error]);

    return <div>Ошибка загрузки данных: {error.message}</div>;
}
