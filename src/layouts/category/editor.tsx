import { useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { WithId } from "mongodb";
import fetcher from "../../lib/fetcher";
import Icon from "@mdi/react";
import { mdiTagOutline } from "@mdi/js";
import { Category } from "../../types/category";
import PrimaryButton from "../../components/button/primary";
import ColorSelector from "../../components/colorselector";
import IconSelector from "../../components/category/icon/selector";
import CategoryTypeTabs from "../../layouts/category/typetabs";
import SettingsBlock from "../settings/block";
import Input from "../../components/input";
import Blur from "../../components/blur";
import LoadingLayout from "../loading";
import AmountEditor from "../../components/amounteditor";

export default function CategoryEditor({ _id, ...data }: WithId<Category>) {
    const navigate = useNavigate();

    const [categoryData, setCategoryData] = useState<Category>(data);
    const [busy, setBusy] = useState(false);

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

    if (busy) {
        return (
            <Blur>
                <LoadingLayout>Сохранение данных ...</LoadingLayout>
            </Blur>
        );
    }

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
                        <div className="flex justify-between">
                            {categoryData.type === "expense"
                                ? "Планирую тратить"
                                : "Планирую получать"}
                            <span className="text-[#161414]">в месяц</span>
                        </div>
                    }
                >
                    <div className="flex items-center gap-4">
                        <AmountEditor
                            amount={{
                                currency: "RUB",
                                ...categoryData.plan,
                            }}
                            onChange={(plan) => {
                                setCategoryData((data) => ({
                                    ...data,
                                    plan,
                                }));
                            }}
                            noBorder
                        />
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
                        setBusy(true);

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
                    spinner={false}
                />
            </div>
        </div>
    );
}
