import { mdiLoading } from "@mdi/js";
import Icon from "@mdi/react";

export default function LogoutLayout() {
    return (
        <div className="h-full w-full flex items-center justify-center">
            <div className="bg-white py-6 px-10 shadow-xl rounded-md">
                <div className="animate-spin w-12 h-12 mx-auto">
                    <Icon path={mdiLoading} size={2} />
                </div>
                <div className="pt-4">Выход из системы ...</div>
            </div>
        </div>
    );
}
