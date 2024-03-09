import { FormEventHandler, useRef } from "react";
import Modal from "./modal";
import RfidStorage from "../classes/rfid-storage";
import { useNavigate } from "react-router";

export default function CreateEmployeeForm({ id }: { id: string }) {
    const name = useRef<HTMLInputElement>(null);
    const nationalId = useRef<HTMLInputElement>(null);
    const birthDate = useRef<HTMLInputElement>(null);
    const address = useRef<HTMLInputElement>(null);
    const branch = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    const onSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        RfidStorage.setCardData(id, {
            name: name.current?.value,
            nationalId: nationalId.current?.value,
            birthDate: birthDate.current?.value,
            address: address.current?.value,
            branch: branch.current?.value,
        });

        navigate("/" + id);
    }

    return (
        <Modal>
            <h1>يمكنك تجاهل الواجهة اذا لم تكن تريد تسجيل الكارت</h1>
            <form className="flex flex-col gap-3 bg-gray-50 m-auto w-[50vw] p-2" onSubmit={onSubmit}>
                <input ref={name} placeholder="الاسم" className="shadow-sm p-2" />
                <input ref={nationalId} placeholder="الرقم القومي" className="shadow-sm p-2" />
                <input ref={birthDate} placeholder="تاريخ الميلاد" type="date" className="shadow-sm p-2" />
                <input ref={address} placeholder="العنوان" type="string" className="shadow-sm p-2" />
                <input ref={branch} placeholder="الفرع التابع له" className="shadow-sm p-2" />
                <input type="submit" value="تأكيد" className="cursor-pointer bg-slate-200 p-2" />
            </form>
        </Modal>
    )
}