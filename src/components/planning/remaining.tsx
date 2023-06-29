import Amount from "../amount";
import Bar from "../bar";

export default function Remaining() {
    return (
        <div
            className="grid items-center gap-2 py-3 px-4 rounded-2xl w-full"
            style={{
                backgroundColor: "#9DD1EC",
            }}
        >
            <div className="text-sm">
                Остаток с учетом запланированных средств
            </div>

            <div className="flex gap-1">
                <Amount
                    currency="RUB"
                    value={90000}
                    iconSize={0.7}
                    style={{ fontSize: "11pt" }}
                />
                <span>из</span>
                <Amount
                    currency="RUB"
                    value={100000}
                    iconSize={0.7}
                    style={{ fontSize: "11pt" }}
                />
            </div>

            <Bar total={100000} used={10000} size="medium" />
        </div>
    );
}
