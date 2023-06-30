import { useCallback, useState } from "react";
import Converter from "../components/exchange/converter";
import Keyboard, {
    KeyboardButtonHandler,
} from "../components/exchange/keyboard";

export default function Exchange() {
    const [value, setValue] = useState<number>(1000);

    const keyboardHandler = useCallback<KeyboardButtonHandler>((arg) => {
        switch (arg.type) {
            case "digit":
                setValue((value) => value * 10 + arg.digit);
                break;

            case "backspace":
                setValue((value) => {
                    if (value === 0) {
                        return value;
                    }

                    if (value < 10) {
                        return 0;
                    }

                    return Math.trunc(value / 10);
                });
                break;

            case "comma":
                break;
        }
    }, []);

    return (
        <div className="grid gap-4">
            <Converter value={value} rate={80} />
            <Keyboard onClick={keyboardHandler} />
        </div>
    );
}
