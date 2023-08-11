import { TransferItem } from "../../../types/transfer";
import TransferHistoryItem from "./item";

export default function TransferHistoryLayout({
    items,
}: {
    items: TransferItem[];
}) {
    return (
        <div className="py-4 grid gap-3">
            {items.map((item, index) => (
                <TransferHistoryItem key={index} {...item} />
            ))}
        </div>
    );
}
