import { LoaderFunctionArgs, defer } from "react-router-dom";
import fetcher from "../lib/fetcher";
import OperationLayout from "../layouts/operation";
import LoadablePage from "../components/loadable";
import { Operation } from "../types/operation";

export default function OperationPage() {
    return <LoadablePage renderer={(data) => <OperationLayout {...data} />} />;
}

export function OperationPageLoader({ params }: LoaderFunctionArgs) {
    const { id = "new" } = params;

    switch (id) {
        case "new":
            const data: Operation = {
                type: "expense",
                date: new Date(),
                amount: {
                    currency: "RUB",
                },
            };

            return defer({ data });
    }

    return defer({
        data: Loader(id),
    });
}

async function Loader(id: string) {
    const resp = await fetcher("get_operation/?id=" + id);
    const data = await resp.json();

    return data;
}
