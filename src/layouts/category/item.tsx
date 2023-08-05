import { ReactNode, useState } from "react";
import { WithId } from "mongodb";
import { Category } from "../../types/category";
import { Link } from "react-router-dom";
import CategoryIcon from "../../components/category/icon";
import Blur from "../../components/blur";
import PrimaryButton from "../../components/button/primary";

export default function CategoryItem({ _id, name, ...rest }: WithId<Category>) {
    return (
        <Container item={{ _id, ...rest }}>
            <div className="grid gap-3 justify-items-center">
                <CategoryIcon size={1.5} {...rest} />
                <div>{name}</div>
            </div>
        </Container>
    );
}

function Container({
    children,
    item,
}: {
    children: ReactNode;
    item: WithId<Pick<Category, "other">>;
}) {
    const [showError, setShowError] = useState(false);

    if (item.other) {
        if (!showError) {
            return <div onClick={() => setShowError(true)}>{children}</div>;
        }

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
                            onClick={() => setShowError(false)}
                        />
                    </div>
                </div>
            </Blur>
        );
    }

    return <Link to={item._id.toString()}>{children}</Link>;
}
