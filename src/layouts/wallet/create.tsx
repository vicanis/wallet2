import { useState } from "react";
import IconSelector from "../../components/category/icon/selector";
import ColorSelector from "../../components/colorselector";
import CurrencyMiniSelector from "../../components/currency/miniselector";
import Input from "../../components/input";
import SettingsBlock from "../settings/block";
import { Wallet } from "../../types/wallet";

export default function CreateWalletLayout() {
    const [data, setData] = useState<Wallet>({
        name: "",
        currency: "RUB",
        value: 0,
        icon: "",
        color: "",
    });

    return (
        <div className="grid gap-8 p-4">
            <SettingsBlock>
                <div className="flex items-center gap-4 w-3/4 mx-auto">
                    <Input
                        type="number"
                        style={{
                            textAlign: "center",
                            fontSize: "x-large",
                        }}
                        defaultValue={data.value}
                        onChange={(value) => {
                            setData((data) => ({
                                ...data,
                                value: Number(value),
                            }));
                        }}
                    />
                    <CurrencyMiniSelector
                        currency={data.currency}
                        onChange={(currency) => {
                            setData((data) => ({
                                ...data,
                                currency,
                            }));
                        }}
                    />
                </div>
            </SettingsBlock>

            <SettingsBlock title="Имя счета">
                <Input
                    placeholder="Введите имя счета"
                    onChange={(name) => {
                        setData((data) => ({
                            ...data,
                            name,
                        }));
                    }}
                />
            </SettingsBlock>

            <SettingsBlock title="Иконка">
                <IconSelector
                    color={data.color!}
                    onSelect={(icon) => {
                        setData((data) => ({
                            ...data,
                            icon,
                        }));
                    }}
                    selected={data.icon}
                    type="income"
                />
            </SettingsBlock>

            <SettingsBlock title="Цвет">
                <ColorSelector
                    selected={data.color!}
                    onSelect={(color) => {
                        setData((data) => ({
                            ...data,
                            color,
                        }));
                    }}
                />
            </SettingsBlock>
        </div>
    );
}
