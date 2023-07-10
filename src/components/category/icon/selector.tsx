import CategoryIcon, { IconType, Icons } from ".";

export default function IconSelector({ color }: { color: string }) {
    const keys = Object.keys(Icons) as IconType[];

    return (
        <div className="flex gap-x-16 gap-y-8 flex-wrap">
            {keys.map((key) => (
                <span key={key} className="m-auto">
                    <CategoryIcon icon={Icons[key]} color={color} size={2} />
                </span>
            ))}
        </div>
    );
}
