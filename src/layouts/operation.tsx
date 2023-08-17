import { useState } from "react";
import { WithId } from "mongodb";
import { useNavigate } from "react-router-dom";
import fetcher from "../lib/fetcher";
import { mdiCalendarMonthOutline } from "@mdi/js";
import Icon from "@mdi/react";
import { Operation } from "../types/operation";
import RadioGroup from "../components/radiogroup";
import WalletSelector from "./wallet/selector";
import InputGroup from "../components/group";
import AmountEditor from "../components/amounteditor";
import CategorySelector from "./category/selector";
import PrimaryButton from "../components/button/primary";
import DatePicker from "../components/datepicker";
import Blur from "../components/blur";
import LoadingLayout from "./loading";

export default function OperationLayout({ _id, ...data }: WithId<Operation>) {
    const navigate = useNavigate();
    const [operationData, setOperationData] = useState<Operation>(data);
    const [busy, setBusy] = useState(false);

    if (busy) {
        return (
            <Blur>
                <LoadingLayout>Сохранение данных ...</LoadingLayout>
            </Blur>
        );
    }

    return (
        <div className="p-4 grid gap-6 justify-stretch">
            <div className="flex justify-center gap-2 items-center">
                <Icon
                    path={mdiCalendarMonthOutline}
                    size={1.5}
                    color="#0A90D5"
                />
                <DatePicker
                    value={data.date.toString()}
                    onChange={(date) =>
                        setOperationData((data) => ({
                            ...data,
                            date,
                        }))
                    }
                />
            </div>

            <div className="flex justify-center">
                <RadioGroup
                    items={[
                        {
                            id: "expense",
                            name: "Расход",
                            selected: operationData.type === "expense",
                        },
                        {
                            id: "income",
                            name: "Доход",
                            selected: operationData.type === "income",
                        },
                    ]}
                    onChange={(id: string) => {
                        navigate(`/${id}`);
                        setOperationData((operation) => ({
                            ...operation,
                            type: id as "expense" | "income",
                        }));
                    }}
                />
            </div>

            <InputGroup name="Счет">
                <WalletSelector
                    selected={operationData.wallet}
                    onChange={(wallet) => {
                        setOperationData((operation) => ({
                            ...operation,
                            wallet,
                        }));
                    }}
                />
            </InputGroup>

            <InputGroup name="Сумма">
                <AmountEditor
                    amount={operationData.amount}
                    onChange={(amount) => {
                        setOperationData((operation) => ({
                            ...operation,
                            amount,
                        }));
                    }}
                    noBorder
                />
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
                    className="w-full py-2"
                    defaultValue={operationData.comment}
                    onChange={(event) => {
                        const comment = event.target.value;

                        if (
                            comment === null ||
                            typeof comment === "undefined"
                        ) {
                            return;
                        }

                        if (comment === "") {
                            setOperationData((operation) => {
                                delete operation.comment;
                                return { ...operation };
                            });

                            return;
                        }

                        setOperationData((operation) => ({
                            ...operation,
                            comment,
                        }));
                    }}
                />
            </InputGroup>

            <InputGroup name="Категория">
                <CategorySelector
                    type={operationData.type}
                    selected={operationData.category}
                    onChange={(category) => {
                        setOperationData((operation) => ({
                            ...operation,
                            category,
                        }));
                    }}
                />
            </InputGroup>

            <div className="text-center">
                <PrimaryButton
                    title="Сохранить"
                    onClick={async () => {
                        setBusy(true);

                        await fetcher(
                            "set_operation",
                            { method: "POST" },
                            { _id, ...operationData }
                        );

                        navigate("/");
                    }}
                />
            </div>
        </div>
    );
}
