import { Fragment } from "react";
import Pending from "../components/pending";
import Remaining from "../components/remaining";

export default function Planning() {
    return (
        <div className="grid gap-4 px-1">
            <Pending />
            <Remaining />
        </div>
    );
}
