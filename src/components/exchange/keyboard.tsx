import { ReactNode } from "react";
import { mdiBackspace } from "@mdi/js";
import Icon from "@mdi/react";

export default function Keyboard({
    onClick,
}: {
    onClick: KeyboardButtonHandler;
}) {
    return (
        <div className="grid grid-cols-3 px-4">
            <Button
                char="7"
                borders={{
                    right: true,
                    bottom: true,
                }}
                onClick={onClick}
            />
            <Button
                char="8"
                borders={{
                    right: true,
                    bottom: true,
                }}
                onClick={onClick}
            />
            <Button
                char="9"
                borders={{
                    bottom: true,
                }}
                onClick={onClick}
            />
            <Button
                char="4"
                borders={{
                    right: true,
                    bottom: true,
                }}
                onClick={onClick}
            />
            <Button
                char="5"
                borders={{
                    right: true,
                    bottom: true,
                }}
                onClick={onClick}
            />
            <Button
                char="6"
                borders={{
                    bottom: true,
                }}
                onClick={onClick}
            />
            <Button
                char="1"
                borders={{
                    right: true,
                    bottom: true,
                }}
                onClick={onClick}
            />
            <Button
                char="2"
                borders={{
                    right: true,
                    bottom: true,
                }}
                onClick={onClick}
            />
            <Button
                char="3"
                borders={{
                    bottom: true,
                }}
                onClick={onClick}
            />
            <Button
                char="."
                borders={{
                    right: true,
                }}
                onClick={onClick}
            />
            <Button
                char="0"
                borders={{
                    right: true,
                }}
                onClick={onClick}
            />
            <Button
                char={<Icon path={mdiBackspace} size={1.25} />}
                onClick={onClick}
            />
        </div>
    );
}

function Button({
    char,
    borders,
    onClick,
}: {
    char: ReactNode;
    borders?: {
        right?: boolean;
        bottom?: boolean;
    };
    onClick: KeyboardButtonHandler;
}) {
    return (
        <div
            className={`py-6 text-2xl flex items-center justify-center ${
                borders?.right && "border-r-2"
            } ${
                borders?.bottom && "border-b-2"
            } border-gray-200 hover:bg-sky-200 hover:cursor-pointer select-none`}
            style={{
                fontWeight: 500,
            }}
            onClick={() => {
                if (typeof char === "string") {
                    if (char === ".") {
                        onClick({
                            type: "comma",
                        });
                    } else {
                        onClick({
                            type: "digit",
                            digit: Number(char),
                        });
                    }
                } else {
                    onClick({
                        type: "backspace",
                    });
                }
            }}
        >
            {char}
        </div>
    );
}

export type KeyboardButtonHandler = (
    arg: KeyboardDigitButtonHandler | KeyboardSpecialButtonHandler
) => void;

interface KeyboardDigitButtonHandler {
    type: "digit";
    digit: number;
}

interface KeyboardSpecialButtonHandler {
    type: "comma" | "backspace";
}
