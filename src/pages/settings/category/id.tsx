import React from "react";
import {
    Await,
    LoaderFunctionArgs,
    defer,
    useLoaderData,
} from "react-router-dom";
import { WithId } from "mongodb";
import { Category } from "../../../types/category";
import Blur from "../../../components/blur";
import LoadingLayout from "../../../layouts/loading";

export default function CategorySettingsItemPage() {
    const { item } = useLoaderData() as { item: WithId<Category> };

    return (
        <div>
            <React.Suspense
                fallback={
                    <Blur>
                        <LoadingLayout>Загрузка данных ...</LoadingLayout>
                    </Blur>
                }
            >
                <Await resolve={item} errorElement={<div>Error loading</div>}>
                    {(data) => (
                        <div>
                            Category item page, loader data?{" "}
                            {JSON.stringify(data)}
                        </div>
                    )}
                </Await>
            </React.Suspense>
        </div>
    );
}

export function CategoryItemLoader({ params }: LoaderFunctionArgs) {
    const { id } = params;

    if (typeof id === "undefined") {
        return Promise.reject();
    }

    if (id === "new") {
        return defer({
            item: {},
        });
    }

    return defer({
        item: Loader(id),
    });
}

async function Loader(id: string) {
    const resp = await fetch("/.netlify/functions/get_category/?id=" + id);
    const data = await resp.json();

    return data;
}
