import LoadablePage from "../../../components/loadable";
import CategoryArrangementLayout from "../../../layouts/category/arrangement";

export default function CategoryArrangementPage() {
    return (
        <LoadablePage
            renderer={(data) => <CategoryArrangementLayout initList={data} />}
        />
    );
}
