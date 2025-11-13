import BreadCrumb from "@/components/breadCrumb";
import CreateGenreForm from "./createGenreForm";

export default async function createGenrePage(params) {
    return (
        <div className="m-10">
            <BreadCrumb
                items={[
                    { href: "/staff/genres", label: "จัดการหมวดหมู่หนังสือ" },
                    { label: "เพิ่มหมวดหมู่หนังสือ" },
                ]}
            />
            <CreateGenreForm />
        </div>
    );
}