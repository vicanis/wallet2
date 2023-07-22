import { defer } from "react-router-dom";
import CategoryList from "../../../layouts/category/list";
import LoadablePage from "../../../components/loadable";
import ConfirmationProvider from "../../../components/confirmation/provider";

export default function CategoryListPage() {
    return (
        <LoadablePage
            renderer={(data) => (
                <ConfirmationProvider>
                    <CategoryList list={data} />
                </ConfirmationProvider>
            )}
        />
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
