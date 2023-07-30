import { LoaderFunctionArgs, defer } from "react-router-dom";
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
    const resp = await fetch("/.netlify/functions/get_operation/?id=" + id);
    const data = await resp.json();

    return data;
}
