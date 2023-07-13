import { Tab } from ".";

export default function Item({
    icon,
    name,
    selected,
    ...rest
}: Omit<Tab, "id"> & React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={`grid gap-2 ${!selected ? "opacity-50" : ""}`}
            {...rest}
        >
            <img src={icon} className="mx-auto" />
            <div className="text-center">{name}</div>
        </div>
    );
}
