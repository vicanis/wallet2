import { defer, useLoaderData } from "react-router-dom";
import CategoryList from "../../../layouts/category/list";
import { Category } from "../../../types/category";
import Button from "../../../components/button";
import { WithId } from "mongodb";
import { Link } from "react-router-dom";
import LoadablePage from "../../../components/loadable";

export default function CategorySettingsPage() {
    const { list } = useLoaderData() as { list: WithId<Category>[] };

    return (
        <div className="grid gap-4 p-4">
            <Link to="new">
                <Button>Создать категорию</Button>
            </Link>

            <LoadablePage renderer={(data) => <CategoryList list={data} />} />
        </div>
    );
}

export function CategoryListLoader() {
    return defer({
        data: Loader(),
    });
}

async function Loader() {
    const resp = await fetch("/.netlify/functions/get_categories");
    const data = await resp.json();

    return data;
}
