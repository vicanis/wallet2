export default function PrimaryButton({ title }: { title: string }) {
    return (
        <div
            className="w-max mx-auto px-8 py-4 rounded-xl font-semibold"
            style={{
                backgroundColor: "#1F93CE",
                color: "#F6FCFF",
            }}
        >
            {title}
        </div>
    );
}
