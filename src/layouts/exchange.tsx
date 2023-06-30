import Converter from "../components/exchange/converter";
import Keyboard from "../components/exchange/keyboard";

export default function Exchange() {
    return (
        <div className="grid gap-4">
            <Converter />
            <Keyboard />
        </div>
    );
}
