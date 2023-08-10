import { ReactNode, useState } from "react";
import { WithId } from "mongodb";
import { Category } from "../../types/category";
import { Link } from "react-router-dom";
import CategoryIcon from "../../components/category/icon";
import PrimaryButton from "../../components/button/primary";
import Warning from "../../components/warning";

export default function CategoryItem({ _id, name, ...rest }: WithId<Category>) {
    return (
        <Container item={{ _id, ...rest }}>
            <div className="grid gap-3 justify-items-center">
                <CategoryIcon size={1.5} {...rest} />
                <div className="text-center">{name}</div>
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
            <Warning>
                <span>Эта категория не редактируемая</span>
                <PrimaryButton title="OK" onClick={() => setShowError(false)} />
            </Warning>
        );
    }

    return <Link to={item._id.toString()}>{children}</Link>;
}
