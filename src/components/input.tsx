import { InputHTMLAttributes } from "react";

export default function Input({
    onChange,
    type = "text",
    ...rest
}: Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> & {
    onChange: (value: string) => void;
}) {
    return (
        <input
            className="border-b-2 border-b-[#0084C8] w-full placeholder-[#8A8181] px-1 py-2"
            type="text"
            {...rest}
            onChange={(event) => onChange(event.target.value)}
        />
    );
}
