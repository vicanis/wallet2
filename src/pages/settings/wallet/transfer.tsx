import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "../../../lib/dayjs";
import type { Transfer } from "../../../types/transfer";
import CurrencyMiniSelector from "../../../components/currency/miniselector";
import DatePicker from "../../../components/datepicker";
import Input from "../../../components/input";
import SettingsBlock from "../../../layouts/settings/block";
import WalletSelector from "../../../layouts/wallet/selector";
import PrimaryButton from "../../../components/button/primary";
import fetcher from "../../../lib/fetcher";
import LoadingLayout from "../../../layouts/loading";
import Blur from "../../../components/blur";

export default function CreateTransferPage() {
    const navigate = useNavigate();
    const [transferData, setTransferData] = useState<Transfer>({
        date: dayjs().toDate(),
        amount: {
            currency: "RUB",
        },
    });
    const [busy, setBusy] = useState(false);

    if (busy) {
        return (
            <Blur>
                <LoadingLayout>Сохранение данных ...</LoadingLayout>
            </Blur>
        );
    }

    return (
        <div className="grid gap-8 p-6">
            <SettingsBlock title="Перевод со счета">
                <WalletSelector
                    onChange={(id, items) => {
                        setTransferData((data) => {
                            // if this wallet is selected as destination
                            if (typeof data.dst !== "undefined") {
                                if (data.dst.toString() === id.toString()) {
                                    // use this wallet as source
                                    data.src = id;
                                    // unset destination wallet
                                    delete data.dst;
                                    return { ...data };
                                }
                            }

                            // if no source wallet was specified
                            // or source wallet was changed
                            if (
                                typeof data.src === "undefined" ||
                                (typeof data.src !== "undefined" &&
                                    data.src.toString() !== id.toString())
                            ) {
                                return { ...data, src: id };
                            }

                            // no changes

                            return data;
                        });
                    }}
                    selected={transferData.src}
                    withBalance
                />
            </SettingsBlock>

            <SettingsBlock title="Перевод на счет">
                <WalletSelector
                    onChange={(id) => {
                        setTransferData((data) => {
                            // if this wallet is selected as source
                            if (typeof data.src !== "undefined") {
                                if (data.src.toString() === id.toString()) {
                                    // use this wallet as destination
                                    data.dst = id;
                                    // unset destination wallet
                                    delete data.src;
                                    return { ...data };
                                }
                            }

                            // if no destination wallet was specified
                            // or destination wallet was changed
                            if (
                                typeof data.dst === "undefined" ||
                                (typeof data.dst !== "undefined" &&
                                    data.dst.toString() !== id.toString())
                            ) {
                                return { ...data, dst: id };
                            }

                            // no changes
                            return data;
                        });
                    }}
                    selected={transferData.dst}
                    withBalance
                />
            </SettingsBlock>

            <SettingsBlock title={"Сумма перевода"}>
                <div className="flex items-center gap-4">
                    <Input
                        type="number"
                        placeholder="не задано"
                        defaultValue={transferData.amount.value}
                        onChange={(value) => {
                            setTransferData((data) => {
                                data.amount.value = Number(value);
                                return { ...data };
                            });
                        }}
                    />
                    <CurrencyMiniSelector
                        currency={transferData.amount.currency}
                        onChange={(currency) => {
                            setTransferData((data) => {
                                data.amount.currency = currency;
                                return { ...data };
                            });
                        }}
                    />
                </div>
            </SettingsBlock>

            <SettingsBlock title="Дата перевода">
                <span className="text-[#0084C8] font-semibold">
                    <DatePicker
                        value={dayjs().toString()}
                        onChange={(date) => {
                            setTransferData((data) => ({
                                ...data,
                                date,
                            }));
                        }}
                    />
                </span>
            </SettingsBlock>

            <SettingsBlock title="Комментарий">
                <Input
                    type="text"
                    placeholder="Комментарий"
                    onChange={(text) => {
                        setTransferData((data) => ({
                            ...data,
                            comment: text,
                        }));
                    }}
                />
            </SettingsBlock>

            <PrimaryButton
                title="Добавить"
                onClick={async () => {
                    setBusy(true);

                    await fetcher("transfer", { method: "POST" }, transferData);

                    navigate(-1);
                }}
                spinner={false}
            />
        </div>
    );
}
