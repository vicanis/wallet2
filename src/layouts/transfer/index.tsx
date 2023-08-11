import Tabs from "../../components/tabs";
import ImageFilter from "../../assets/menu/top/filter.svg";
import ImageMoneyBag from "../../assets/menu/top/moneybag.svg";
import TransferHistoryLayout from "./history";
import { TransferItem } from "../../types/transfer";

export default function TransferLayout({ data }: { data: TransferItem[] }) {
    return (
        <div>
            <Tabs
                tabs={[
                    {
                        id: "filter",
                        icon: ImageFilter,
                        name: "Фильтр",
                    },
                    {
                        id: "wallet",
                        icon: ImageMoneyBag,
                        name: "Счет",
                    },
                ]}
                onSelect={(tab) => {
                    console.log("selected", tab);
                }}
            />

            <TransferHistoryLayout items={data} />
        </div>
    );
}
