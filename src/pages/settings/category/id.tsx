import { LoaderFunctionArgs, defer } from "react-router-dom";
import LoadablePage from "../../../components/loadable";
import ImageArrowDown from "../../../assets/arrow_down2.svg";
import ImageArrowUp from "../../../assets/arrow_up2.svg";
import Tabs from "../../../components/tabs";
import { ReactNode, useEffect, useReducer, useState } from "react";
import Icon from "@mdi/react";
import { mdiListBoxOutline } from "@mdi/js";
import CurrencyMiniSelector from "../../../components/currency/miniselector";
import { CurrencyType } from "../../../components/currency/selector";
import { Category } from "../../../types/category";
import PrimaryButton from "../../../components/button/primary";
import ColorSelector from "../../../components/colorselector";
import IconSelector from "../../../components/category/icon/selector";

export default function CategorySettingsItemPage() {
    const [activeTab, setActiveTab] = useState("expense");

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

                case "plan":
                    state.plan.value = action.value;
                    break;

                case "currency":
                    state.plan.currency = action.currency;
                    break;
            }

            return { ...state };
        },
        {
            type: "expense",
            name: "",
            plan: {
                currency: "RUB",
            },
            color: "#F52D20",
        }
    );

    useEffect(() => {
        console.log("category data updated", categoryData);
    }, [categoryData]);

    return (
        <LoadablePage
            renderer={(data) => (
                <div>
                    <Tabs
                        tabs={[
                            {
                                id: "expense",
                                icon: ImageArrowUp,
                                name: "Расход",
                            },
                            {
                                id: "income",
                                icon: ImageArrowDown,
                                name: "Доход",
                            },
                        ]}
                        selected={categoryData.type}
                        onSelect={(tab) => {
                            dispatchCategoryData({
                                type: "type",
                                value: tab.id as "expense" | "income",
                            });
                        }}
                    />

                    <div className="p-6 text-[#0084C8] grid gap-6">
                        <div className="flex items-center gap-3">
                            <Icon path={mdiListBoxOutline} size={1.5} />

                            <input
                                className="border-b-2 border-b-[#0084C8] w-full placeholder-[#8A8181]"
                                type="text"
                                placeholder="Название категории"
                                defaultValue={categoryData.name}
                                onChange={(event) =>
                                    dispatchCategoryData({
                                        type: "name",
                                        value: event.target.value,
                                    })
                                }
                            />
                        </div>

                        <Block
                            title={
                                activeTab === "expense"
                                    ? "Планирую тратить"
                                    : "Планирую получать"
                            }
                        >
                            <div className="flex items-center gap-4">
                                <input
                                    type="text"
                                    placeholder="не задано"
                                    className="border-b-2 border-b-[#0084C8] placeholder-[#8A8181] max-w-[125px]"
                                    defaultValue={categoryData.plan.value ?? 0}
                                    onChange={(event) =>
                                        dispatchCategoryData({
                                            type: "plan",
                                            value: Number(event.target.value),
                                        })
                                    }
                                />
                                <CurrencyMiniSelector
                                    currency={
                                        categoryData.plan.currency ?? "RUB"
                                    }
                                    onChange={(currency) =>
                                        dispatchCategoryData({
                                            type: "currency",
                                            currency,
                                        })
                                    }
                                />
                                <div className="text-[#161414]">в месяц</div>
                            </div>
                        </Block>

                        <Block title="Иконки">
                            <IconSelector color={categoryData.color ?? ""} />
                        </Block>

                        <Block title="Цвет">
                            <ColorSelector
                                selected={categoryData.color ?? ""}
                                onSelect={(color) =>
                                    dispatchCategoryData({
                                        type: "color",
                                        value: color,
                                    })
                                }
                            />
                        </Block>

                        <PrimaryButton title="Добавить" />
                    </div>
                </div>
            )}
        />
    );
}

function Block({ title, children }: { title: ReactNode; children: ReactNode }) {
    return (
        <div className="grid gap-3">
            <div className="text-[#8A8181]">{title}</div>

            {children}
        </div>
    );
}

export function CategoryItemLoader({ params }: LoaderFunctionArgs) {
    const { id } = params;

    if (typeof id === "undefined") {
        return Promise.reject();
    }

    if (id === "new") {
        return defer({
            data: {},
        });
    }

    return defer({
        data: Loader(id),
    });
}

async function Loader(id: string) {
    const resp = await fetch("/.netlify/functions/get_category/?id=" + id);
    const data = await resp.json();

    return data;
}

type CategoryAction =
    | {
          type: "type";
          value: "expense" | "income";
      }
    | {
          type: "name" | "color";
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
