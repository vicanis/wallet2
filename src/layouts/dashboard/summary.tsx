import IconArrowUp from "../../assets/arrow_up.svg";
import IconArrowDown from "../../assets/arrow_down.svg";
import Amount from "../../components/amount";
import { DashboardBalance } from ".";

export default function DashboardSummaryLayout({
    balance,
}: {
    balance: DashboardBalance;
}) {
    return (
        <div
            className="text-center text-white rounded-b-2xl px-2 py-4 grid gap-4"
            style={{ backgroundColor: "#0084C8" }}
        >
            <div className="flex justify-between px-4">
                <div className="flex gap-1 items-center">
                    <img src={IconArrowUp} />
                    <div className="flex flex-col justify-center">
                        <span className="text-xs text-white pl-1">
                            Входящие
                        </span>
                        <Amount
                            currency={balance.currency}
                            value={balance.income}
                            iconSize={0.7}
                            style={{ color: "white", fontSize: "11pt" }}
                        />
                    </div>
                </div>

                <div className="flex gap-1 items-center">
                    <img src={IconArrowDown} />
                    <div className="flex flex-col justify-center">
                        <span className="text-xs text-white pl-1">
                            Исходящие
                        </span>
                        <Amount
                            currency={balance.currency}
                            value={balance.expense}
                            iconSize={0.7}
                            style={{ color: "white", fontSize: "11pt" }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
