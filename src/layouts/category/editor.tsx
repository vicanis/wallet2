import { useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { WithId } from "mongodb";
import fetcher from "../../lib/fetcher";
import Icon from "@mdi/react";
import { mdiTagOutline } from "@mdi/js";
import { Category } from "../../types/category";
import CurrencyMiniSelector from "../../components/currency/miniselector";
import PrimaryButton from "../../components/button/primary";
import ColorSelector from "../../components/colorselector";
import IconSelector from "../../components/category/icon/selector";
import CategoryTypeTabs from "../../layouts/category/typetabs";
import SettingsBlock from "../settings/block";
import Input from "../../components/input";

export default function CategoryEditor({ _id, ...data }: WithId<Category>) {
    const navigate = useNavigate();

    const [categoryData, setCategoryData] = useState<Category>(data);

    useLayoutEffect(() => {
        const isIncome = (icon: string) =>
            ["cash", "card"].indexOf(icon) !== -1;

        if (typeof categoryData.icon !== "undefined") {
            if (
                (categoryData.type === "expense" &&
                    isIncome(categoryData.icon)) ||
                (categoryData.type === "income" && !isIncome(categoryData.icon))
            ) {
                setCategoryData((data) => ({
                    ...data,
                    icon: "",
                }));
            }
        }
    }, [categoryData.type]);

    return (
        <div>
            <CategoryTypeTabs
                selected={categoryData.type}
                onSelect={(tab) => {
                    setCategoryData((data) => ({
                        ...data,
                        type: tab,
                    }));
                }}
            />

            <div className="p-6 text-[#0084C8] grid gap-6">
                <div className="flex items-center gap-3">
                    <Icon path={mdiTagOutline} size={1.5} />

                    <Input
                        placeholder="Название категории"
                        defaultValue={categoryData.name}
                        onChange={(value) =>
                            setCategoryData((data) => ({
                                ...data,
                                name: value,
                            }))
                        }
                    />
                </div>

                <SettingsBlock
                    title={
                        categoryData.type === "expense"
                            ? "Планирую тратить"
                            : "Планирую получать"
                    }
                >
                    <div className="flex items-center gap-4">
                        <Input
                            type="number"
                            placeholder="не задано"
                            defaultValue={categoryData.plan.value ?? 0}
                            onChange={(value) =>
                                setCategoryData((data) => {
                                    const plan = data.plan;
                                    plan.value = Number(value);
                                    return { ...data, plan };
                                })
                            }
                        />
                        <CurrencyMiniSelector
                            currency={categoryData.plan.currency ?? "RUB"}
                            onChange={(currency) =>
                                setCategoryData((data) => {
                                    const plan = data.plan;
                                    plan.currency = currency;
                                    return { ...data, plan };
                                })
                            }
                        />
                        <div className="text-[#161414]">в месяц</div>
                    </div>
                </SettingsBlock>

                <SettingsBlock title="Иконки">
                    <IconSelector
                        type={categoryData.type}
                        color={categoryData.color ?? "#1F93CE"}
                        selected={categoryData.icon ?? ""}
                        onSelect={(icon) =>
                            setCategoryData((data) => ({
                                ...data,
                                icon,
                            }))
                        }
                    />
                </SettingsBlock>

                <SettingsBlock title="Цвет">
                    <ColorSelector
                        selected={categoryData.color ?? ""}
                        onSelect={(color) =>
                            setCategoryData((data) => ({
                                ...data,
                                color,
                            }))
                        }
                    />
                </SettingsBlock>

                <PrimaryButton
                    disabled={
                        categoryData.name === "" ||
                        categoryData.color === "" ||
                        categoryData.icon === ""
                    }
                    title={
                        typeof _id === "undefined" ? "Добавить" : "Сохранить"
                    }
                    onClick={async () => {
                        await fetcher(
                            "set_category",
                            { method: "POST" },
                            {
                                _id,
                                ...categoryData,
                            }
                        );

                        navigate(-1);
                    }}
                />
            </div>
        </div>
    );
}
