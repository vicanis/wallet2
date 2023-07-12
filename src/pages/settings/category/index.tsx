import { defer } from "react-router-dom";
import CategoryList from "../../../layouts/category/list";
import LoadablePage from "../../../components/loadable";

export default function CategoryListPage() {
    return <LoadablePage renderer={(data) => <CategoryList list={data} />} />;
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
