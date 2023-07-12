import { LoaderFunctionArgs, defer } from "react-router-dom";
import LoadablePage from "../../../components/loadable";
import CategoryEditor from "../../../layouts/category/editor";

export default function CategorySettingsItemPage() {
    return <LoadablePage renderer={(data) => <CategoryEditor {...data} />} />;
}

export function CategoryItemLoader({ params }: LoaderFunctionArgs) {
    const { id } = params;

    if (typeof id === "undefined") {
        return Promise.reject();
    }

    switch (id) {
        case "new":
        case "other":
            return defer({
                data: {
                    _id: id,
                    type: "expense",
                    name: "",
                    plan: {
                        currency: "RUB",
                    },
                },
            });
    }

    return defer({
        data: Loader(id),
    });
}

async function Loader(id: string) {
    const resp = await fetch("/.netlify/functions/get_category/?id=" + id);
    const data = await resp.json();

    return data;
}
