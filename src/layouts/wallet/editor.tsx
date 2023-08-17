import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { WithId } from "mongodb";
import fetcher from "../../lib/fetcher";
import IconSelector from "../../components/category/icon/selector";
import ColorSelector from "../../components/colorselector";
import Input from "../../components/input";
import SettingsBlock from "../settings/block";
import { Wallet } from "../../types/wallet";
import Checkbox from "../../components/checkbox";
import PrimaryButton from "../../components/button/primary";
import AmountEditor from "../../components/amounteditor";

export default function WalletEditor({ _id, ...data }: WithId<Wallet>) {
    const navigate = useNavigate();

    const [walletData, setWalletData] = useState<Wallet>(data);

    return (
        <div className="grid gap-8 p-4">
            <SettingsBlock>
                <AmountEditor
                    amount={{ ...walletData }}
                    onChange={(amount) => {
                        setWalletData((operation) => ({
                            ...operation,
                            ...amount,
                        }));
                    }}
                    noBorder
                />
            </SettingsBlock>

            <SettingsBlock title="Имя счета">
                <Input
                    placeholder="Введите имя счета"
                    defaultValue={walletData.name}
                    onChange={(name) => {
                        setWalletData((data) => ({
                            ...data,
                            name,
                        }));
                    }}
                />
            </SettingsBlock>

            <SettingsBlock title="Иконка">
                <IconSelector
                    color={walletData.color ?? "#0084C8"}
                    onSelect={(icon) => {
                        setWalletData((data) => ({
                            ...data,
                            icon,
                        }));
                    }}
                    selected={walletData.icon}
                    type="income"
                />
            </SettingsBlock>

            <SettingsBlock title="Цвет">
                <ColorSelector
                    selected={walletData.color!}
                    onSelect={(color) => {
                        setWalletData((data) => ({
                            ...data,
                            color,
                        }));
                    }}
                />
            </SettingsBlock>

            <Checkbox
                checked={walletData.outcast}
                onChange={(checked) => {
                    setWalletData((data) => ({
                        ...data,
                        outcast: checked,
                    }));
                }}
            >
                Не учитывать в общем балансе
            </Checkbox>

            <PrimaryButton
                title={_id.toString() === "new" ? "Добавить" : "Сохранить"}
                disabled={
                    !walletData.color || !walletData.name || !walletData.icon
                }
                onClick={async () => {
                    await fetcher(
                        "set_wallet",
                        { method: "POST" },
                        {
                            _id,
                            ...walletData,
                        }
                    );

                    navigate(-1);
                }}
            />
        </div>
    );
}
