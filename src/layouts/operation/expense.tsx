import { mdiCalendarMonthOutline } from "@mdi/js";
import Icon from "@mdi/react";
import RadioGroup from "../../components/radiogroup";
import WalletSelector from "../../components/walletselector";
import InputGroup from "../../components/group";
import AmountEditor from "../../components/amounteditor";
import CategorySelector from "../../components/category/selector";
import PrimaryButton from "../../components/button/primary";

export default function OperationExpense() {
    return (
        <div className="grid gap-6 justify-stretch">
            <div className="flex justify-center gap-2 items-center">
                <Icon
                    path={mdiCalendarMonthOutline}
                    size={1.5}
                    color="#0A90D5"
                />
                <span>сегодня</span>
            </div>

            <div className="flex justify-center">
                <RadioGroup
                    items={[
                        {
                            id: "expense",
                            name: "Расход",
                            selected: true,
                        },
                        {
                            id: "income",
                            name: "Доход",
                            selected: false,
                        },
                    ]}
                />
            </div>

            <InputGroup name="Счет">
                <WalletSelector />
            </InputGroup>

            <InputGroup name="Сумма">
                <AmountEditor />
            </InputGroup>

            <InputGroup
                name={
                    <span>
                        Комментарий{" "}
                        <span className="text-gray-400">
                            (при необходимости)
                        </span>
                    </span>
                }
            >
                <input
                    type="text"
                    placeholder="Введите текст"
                    className="w-full"
                />
            </InputGroup>

            <InputGroup name="Категория">
                <CategorySelector />
            </InputGroup>

            <div className="text-center">
                <PrimaryButton title="Сохранить" />
            </div>
        </div>
    );
}
