import dayjs from "../../../lib/dayjs";
import { TransferGroup } from "../../../types/transfer";
import TransferHistoryItem from "./item";

export default function TransferHistoryGroup({ date, items }: TransferGroup) {
    return (
        <div>
            <div className="flex items-center justify-between px-4">
                {dayjs(date).format("DD MMMM, dddd")}
            </div>
            <hr className="my-1" />
            <div className="grid gap-2 mt-2 px-4">
                {items.map((item, index) => (
                    <TransferHistoryItem key={index} {...item} />
                ))}
            </div>
        </div>
    );
}
