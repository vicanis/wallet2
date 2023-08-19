import { TransferGroup } from "../../../types/transfer";
import TransferHistoryGroup from "./group";

export default function TransferHistoryLayout({
    groups,
}: {
    groups: TransferGroup[];
}) {
    return (
        <div className="py-4 grid gap-3">
            {groups.length === 0 && (
                <div className="px-4 text-[#8A8181]">Нет переводов</div>
            )}

            {groups.map((group, index) => (
                <TransferHistoryGroup key={group.date.toString()} {...group} />
            ))}
        </div>
    );
}
