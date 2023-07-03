import Switcher from "../../components/stats/switcher";
import CategoryLayout from "../../layouts/stats/category";

export default function CategoryPage() {
    return (
        <div className="py-4 grid gap-4">
            <div className="mx-auto">
                <Switcher />
            </div>

            <CategoryLayout />
        </div>
    );
}
