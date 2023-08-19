import { mdiCheck, mdiPlusCircle } from "@mdi/js";
import Icon from "@mdi/react";

export default function ColorSelector(props: ColorSelectorProps) {
    return (
        <div className="flex items-center justify-between gap-2">
            <ColorItem color="#F52D20" {...props} />
            <ColorItem color="#E5AF23" {...props} />
            <ColorItem color="#63B611" {...props} />
            <ColorItem color="#102BBA" {...props} />
            <ColorItem color="#761BBDD6" {...props} />
            <Icon
                path={mdiPlusCircle}
                className="w-11 h-11 text-[#0084C8] text-opacity-50"
            />
        </div>
    );
}

function ColorItem({
    color,
    selected,
    onSelect,
}: { color: string } & ColorSelectorProps) {
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

type ColorSelectorProps = {
    selected: string;
    onSelect: (color: string) => void;
};
