import { useEffect, useLayoutEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { WithId } from "mongodb";
import Icon from "@mdi/react";
import { mdiTagOutline } from "@mdi/js";
import { Category } from "../../types/category";
import CurrencyMiniSelector from "../../components/currency/miniselector";
import { CurrencyType } from "../../components/currency/selector";
import PrimaryButton from "../../components/button/primary";
import ColorSelector from "../../components/colorselector";
import IconSelector from "../../components/category/icon/selector";
import CategoryTypeTabs from "../../layouts/category/typetabs";
import Blur from "../../components/blur";
import SettingsBlock from "../settings/block";
import Input from "../../components/input";

export default function CategoryEditor({ _id, ...data }: WithId<Category>) {
    const navigate = useNavigate();

    const [valid, setValid] = useState(data.name !== "");

    const [categoryData, dispatchCategoryData] = useReducer(
        (state: Category, action: CategoryAction) => {
            switch (action.type) {
                case "type":
                    state.type = action.value;
                    break;

                case "name":
                    state.name = action.value;
                    break;

                case "color":
                    state.color = action.value;
                    break;

                case "icon":
                    state.icon = action.value;
                    break;

                case "plan":
                    state.plan.value = action.value;
                    break;

                case "currency":
                    state.plan.currency = action.currency;
                    break;
            }

            return { ...state };
        },
        data
    );

    useEffect(() => {
        setValid(
            categoryData.name !== "" &&
                categoryData.color !== "" &&
                categoryData.icon !== ""
        );
    }, [categoryData]);

    useLayoutEffect(() => {
        const isIncome = (icon: string) =>
            ["cash", "card"].indexOf(icon) !== -1;

        switch (categoryData.type) {
            case "expense":
                if (
                    typeof categoryData.icon !== "undefined" &&
                    !isIncome(categoryData.icon)
                ) {
                    break;
                }

                dispatchCategoryData({
                    type: "icon",
                    value: "",
                });

                break;

            case "income":
                if (
                    typeof categoryData.icon !== "undefined" &&
                    isIncome(categoryData.icon)
                ) {
                    break;
                }

                dispatchCategoryData({
                    type: "icon",
                    value: "",
                });

                break;
        }
    }, [categoryData.type]);

    if (_id.toString() === "other") {
        return (
            <Blur>
                <div className="h-screen w-screen flex items-center justify-center">
                    <div
                        className="p-4 grid gap-4 justify-center text-center bg-white w-3/4"
                        style={{
                            boxShadow: "0px 4px 20px 0px rgba(0, 0, 0, 0.25)",
                        }}
                    >
                        <span>Эта категория не редактируемая</span>
                        <PrimaryButton
                            title="OK"
                            onClick={() => navigate(-1)}
                        />
                    </div>
                </div>
            </Blur>
        );
    }

    return (
        <div>
            <CategoryTypeTabs
                selected={categoryData.type}
                onSelect={(tab) => {
                    dispatchCategoryData({
                        type: "type",
                        value: tab,
                    });
                }}
            />

            <div className="p-6 text-[#0084C8] grid gap-6">
                <div className="flex items-center gap-3">
                    <Icon path={mdiTagOutline} size={1.5} />

                    <Input
                        placeholder="Название категории"
                        defaultValue={categoryData.name}
                        onChange={(value) =>
                            dispatchCategoryData({
                                type: "name",
                                value,
                            })
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
                                dispatchCategoryData({
                                    type: "plan",
                                    value: Number(value),
                                })
                            }
                        />
                        <CurrencyMiniSelector
                            currency={categoryData.plan.currency ?? "RUB"}
                            onChange={(currency) =>
                                dispatchCategoryData({
                                    type: "currency",
                                    currency,
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
                            dispatchCategoryData({
                                type: "icon",
                                value: icon,
                            })
                        }
                    />
                </SettingsBlock>

                <SettingsBlock title="Цвет">
                    <ColorSelector
                        selected={categoryData.color ?? ""}
                        onSelect={(color) =>
                            dispatchCategoryData({
                                type: "color",
                                value: color,
                            })
                        }
                    />
                </SettingsBlock>

                <PrimaryButton
                    disabled={!valid}
                    title={
                        typeof _id === "undefined" ? "Добавить" : "Сохранить"
                    }
                    onClick={async () => {
                        if (!valid) {
                            return;
                        }

                        await fetch("/.netlify/functions/set_category", {
                            method: "POST",
                            body: JSON.stringify({
                                _id,
                                ...categoryData,
                            }),
                        });

                        navigate(-1);
                    }}
                />
            </div>
        </div>
    );
}

type CategoryAction =
    | {
          type: "type";
          value: "expense" | "income";
      }
    | {
          type: "name" | "color" | "icon";
          value: string;
      }
    | {
          type: "plan";
          value: number;
      }
    | {
          type: "currency";
          currency: CurrencyType;
      };
