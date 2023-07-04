import Notice from "../../components/notice";
import StatisticsLayout from "../../layouts/stats/statistics";

export default function StatisticsPage() {
    return (
        <div>
            <StatisticsLayout />
            <Notice text="Сумма указана с учетом конвертации валюты операции в базовую валюту по среднему курсу ЦБ в день операции" />
        </div>
    );
}
