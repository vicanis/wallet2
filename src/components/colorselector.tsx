import { mdiCheck, mdiPlusCircleOutline } from "@mdi/js";
import Icon from "@mdi/react";

export default function ColorSelector({
    selected,
    onSelect,
}: {
    selected: string;
    onSelect: (color: string) => void;
}) {
    function Color({ color }: { color: string }) {
        return (
            <div
                className={`flex items-center justify-center ${
                    color === selected ? "w-12 h-12" : "w-8 h-8 opacity-50"
                }`}
                style={{
                    backgroundColor: color,
                    borderRadius: "50%",
                }}
                onClick={() => onSelect(color)}
            >
                {color === selected && (
                    <Icon path={mdiCheck} size={1.5} color="black" />
                )}
            </div>
        );
    }

    return (
        <div className="flex items-center justify-between gap-2">
            <Color color="#F52D20" />
            <Color color="#E5AF23" />
            <Color color="#63B611" />
            <Color color="#102BBA" />
            <Color color="#761BBDD6" />
            <Icon path={mdiPlusCircleOutline} className="w-11 h-11" />
        </div>
    );
}
