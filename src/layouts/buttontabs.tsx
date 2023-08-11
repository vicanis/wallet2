import { ReactNode } from "react";
import { Link } from "react-router-dom";

export default function ButtonTabsLayout({
    items,
}: {
    items: {
        link: string;
        icon: ReactNode;
        text: string;
    }[];
}) {
    return (
        <div className="flex justify-around items-center p-4 text-center bg-[#0084c8] text-white text-sm rounded-b-lg">
            {items.map((item, index) => (
                <Link
                    key={index}
                    to={item.link}
                    className="flex flex-col gap-2"
                >
                    {item.icon}
                    <div>{item.text}</div>
                </Link>
            ))}
        </div>
    );
}
