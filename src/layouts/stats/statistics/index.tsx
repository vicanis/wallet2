import StatisticsFilter from "./filter";
import BalanceChart from "./balancechart";
import CashFlow from "./cashflow";
import Notice from "../../../components/notice";

export default function StatisticsLayout() {
    return (
        <div className="px-6 py-2 grid gap-4">
            <StatisticsFilter />
            <BalanceChart />
            <CashFlow />
            <Notice text="Сумма указана с учетом конвертации валюты операции в базовую валюту по среднему курсу ЦБ в день операции" />
        </div>
    );
}
