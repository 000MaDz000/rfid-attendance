import Modal from "./modal";

export default function CreateEmployeeForm({ id }: { id: string }) {
    return (
        <Modal>
            <h1>يمكنك تجاهل الواجهة اذا لم تكن تريد تسجيل الكارت</h1>
            <form className="flex flex-col gap-3 bg-gray-50 m-auto w-[50vw] p-2">
                <input placeholder="الاسم" className="shadow-sm p-2" />
                <input placeholder="رقم الهوية" className="shadow-sm p-2" />
                <input placeholder="تاريخ الميلاد" type="date" className="shadow-sm p-2" />
                <input placeholder="العنوان" type="string" className="shadow-sm p-2" />
                <input placeholder="الفرع التابع له" className="shadow-sm p-2" />
            </form>
        </Modal>
    )
}