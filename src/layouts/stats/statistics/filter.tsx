import Currency from "../../../components/stats/currency";
import Year from "../../../components/stats/year";
import ImageMenuIcon from "../../../assets/menuicon.svg";

export default function StatisticsFilter() {
    return (
        <div className="flex justify-between text-[#0D0E0E] font-medium p-3">
            <Year />
            <Currency />
            <img src={ImageMenuIcon} />
        </div>
    );
}
