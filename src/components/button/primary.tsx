export default function PrimaryButton({
    title,
    onClick,
}: {
    title: string;
    onClick?: () => void;
}) {
    return (
        <div
            className="w-max mx-auto px-8 py-4 rounded-xl font-semibold"
            style={{
                backgroundColor: "#1F93CE",
                color: "#F6FCFF",
            }}
            onClick={onClick}
        >
            {title}
        </div>
    );
}
