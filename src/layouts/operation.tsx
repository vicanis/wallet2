import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { mdiCalendarMonthOutline } from "@mdi/js";
import Icon from "@mdi/react";
import { Operation } from "../types/operation";
import RadioGroup from "../components/radiogroup";
import WalletSelector from "./wallet/selector";
import InputGroup from "../components/group";
import AmountEditor from "../components/amounteditor";
import CategorySelector from "../components/category/selector";
import PrimaryButton from "../components/button/primary";

export default function OperationLayout({ data }: { data: Operation }) {
    const navigate = useNavigate();

    const [operation, setOperation] = useState<Operation>(data);

    return (
        <div className="p-4 grid gap-6 justify-stretch">
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
                            selected: operation.type === "expense",
                        },
                        {
                            id: "income",
                            name: "Доход",
                            selected: operation.type === "income",
                        },
                    ]}
                    onChange={(id: string) => {
                        navigate(`/${id}`);
                        setOperation((operation) => ({
                            ...operation,
                            type: id as "expense" | "income",
                        }));
                    }}
                />
            </div>

            <InputGroup name="Счет">
                <WalletSelector
                    selected={operation.wallet}
                    onChange={(wallet) => {
                        setOperation((operation) => ({
                            ...operation,
                            wallet,
                        }));
                    }}
                />
            </InputGroup>

            <InputGroup name="Сумма">
                <AmountEditor
                    amount={operation.amount}
                    onChange={(amount) => {
                        setOperation((operation) => ({
                            ...operation,
                            amount,
                        }));
                    }}
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
                    defaultValue={operation.comment}
                    onChange={(event) => {
                        const comment = event.target.value;

                        if (
                            comment === null ||
                            typeof comment === "undefined"
                        ) {
                            return;
                        }

                        if (comment === "") {
                            setOperation((operation) => {
                                delete operation.comment;
                                return { ...operation };
                            });

                            return;
                        }

                        setOperation((operation) => ({
                            ...operation,
                            comment,
                        }));
                    }}
                />
            </InputGroup>

            <InputGroup name="Категория">
                <CategorySelector
                    type={operation.type}
                    selected={operation.category}
                    onChange={(category) => {
                        setOperation((operation) => ({
                            ...operation,
                            category,
                        }));
                    }}
                />
            </InputGroup>

            <div className="text-center">
                <PrimaryButton
                    title="Сохранить"
                    onClick={() => {
                        console.log("save operation", operation);
                    }}
                />
            </div>
        </div>
    );
}
