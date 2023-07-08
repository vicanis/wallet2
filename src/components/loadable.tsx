import React, { ReactNode } from "react";
import { Await, useLoaderData } from "react-router-dom";
import LoadingLayout from "../layouts/loading";
import Blur from "./blur";

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
            <Await
                resolve={data}
                errorElement={<div>Ошибка загрузки данных</div>}
            >
                {renderer}
            </Await>
        </React.Suspense>
    );
}
