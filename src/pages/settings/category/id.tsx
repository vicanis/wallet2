import { LoaderFunctionArgs, defer } from "react-router-dom";
import fetcher from "../../../lib/fetcher";
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
            return defer({
                data: {
                    _id: id,
                    type: "expense",
                    name: "",
                    plan: {},
                },
            });
    }

    return defer({
        data: Loader(id),
    });
}

async function Loader(id: string) {
    const resp = await fetcher("get_category/?id=" + id);
    const data = await resp.json();

    return data;
}
