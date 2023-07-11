import {
    ReactNode,
    useEffect,
    useLayoutEffect,
    useReducer,
    useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { WithId } from "mongodb";
import Icon from "@mdi/react";
import { mdiListBoxOutline } from "@mdi/js";
import { Category } from "../../types/category";
import CurrencyMiniSelector from "../../components/currency/miniselector";
import { CurrencyType } from "../../components/currency/selector";
import PrimaryButton from "../../components/button/primary";
import ColorSelector from "../../components/colorselector";
import IconSelector from "../../components/category/icon/selector";
import CategoryTypeTabs from "../../layouts/category/typetabs";

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
        setValid(categoryData.name !== "");
    }, [categoryData.name]);

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
                    value: "grocery",
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
                    value: "card",
                });

                break;
        }
    }, [categoryData.type]);

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
                        categoryData.type === "expense"
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
                </Block>

                <Block title="Иконки">
                    <IconSelector
                        type={categoryData.type}
                        color={categoryData.color ?? ""}
                        selected={categoryData.icon ?? "grocery"}
                        onSelect={(icon) =>
                            dispatchCategoryData({
                                type: "icon",
                                value: icon,
                            })
                        }
                    />
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

                <PrimaryButton
                    disabled={!valid}
                    title={
                        typeof _id === "undefined" ? "Добавить" : "Сохранить"
                    }
                    onClick={async () => {
                        if (!valid) {
                            return;
                        }

                        await fetch("/.netlify/functions/add_category", {
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

function Block({ title, children }: { title: ReactNode; children: ReactNode }) {
    return (
        <div className="grid gap-3">
            <div className="text-[#8A8181]">{title}</div>

            {children}
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