import StatisticsFilter from "../../../components/stats/statisticsfilter";
import BalanceChart from "./balancechart";
import CashFlow from "./cashflow";

export default function StatisticsLayout() {
    return (
        <div className="p-2 grid gap-2">
            <StatisticsFilter />
            <BalanceChart />
            <CashFlow />
        </div>
    );
}
