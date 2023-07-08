import { Await, defer, useLoaderData } from "react-router-dom";
import CategoryList from "../../../layouts/category/list";
import { Category } from "../../../types/category";
import Button from "../../../components/button";
import { WithId } from "mongodb";
import { Link } from "react-router-dom";
import React from "react";
import Blur from "../../../components/blur";
import LoadingLayout from "../../../layouts/loading";

export default function CategorySettingsPage() {
    const { list } = useLoaderData() as { list: WithId<Category>[] };

    return (
        <div className="grid gap-4 p-4">
            <Link to="new">
                <Button>Создать категорию</Button>
            </Link>

            <React.Suspense
                fallback={
                    <Blur>
                        <LoadingLayout>Загрузка данных ...</LoadingLayout>
                    </Blur>
                }
            >
                <Await resolve={list} errorElement={<div>Error loading</div>}>
                    {(data) => <CategoryList list={data} />}
                </Await>
            </React.Suspense>
        </div>
    );
}

export function CategoryListLoader() {
    return defer({
        list: Loader(),
    });
}

async function Loader() {
    const resp = await fetch("/.netlify/functions/get_categories");
    const data = await resp.json();

    return data;
}
