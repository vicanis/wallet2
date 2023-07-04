import { mdiInformationOutline } from "@mdi/js";
import Icon from "@mdi/react";

export default function Notice({ text }: { text: string }) {
    return (
        <div
            className="text-md grid gap-2 px-2 py-2 mx-4 border-2 rounded-3xl border-[#0084C8]"
            style={{
                gridTemplateColumns: "auto 1fr",
            }}
        >
            <Icon path={mdiInformationOutline} size={1.5} color="#0A90D5" />
            <div>
                <div className="text-[#91CCE9] font-semibold leading-8">
                    Примечание:
                </div>
                <div className="text-black opacity-50">{text}</div>
            </div>
        </div>
    );
}
