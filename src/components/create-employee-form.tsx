import { FormEventHandler, useRef } from "react";

import { useNavigate } from "react-router";
import Employee from "../classes/employee";
import RfidStorage from "../classes/rfid-storage";

export default function CreateEmployeeForm({ id }: { id: string }) {
    const name = useRef<HTMLInputElement>(null);
    const nationalId = useRef<HTMLInputElement>(null);
    const birthDate = useRef<HTMLInputElement>(null);
    const address = useRef<HTMLInputElement>(null);
    const branch = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    const onSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        Employee.create({
            "name": name.current?.value as string,
            "address": address.current?.value as string,
            "nationalId": nationalId.current?.value as string,
            branch: branch.current?.value as string,
            "birthDate": new Date(birthDate.current?.value as string)
        }).then((result) => {

            return RfidStorage.setCardData(id, result.id).then(() => {
                navigate("/employees/" + result.id);
            });
        });
    }

    return (
        <>
            <form className="flex flex-col gap-3 bg-gray-100 rounded-md m-auto w-[50vw] p-2" onSubmit={onSubmit}>
                <input ref={name} placeholder="الاسم" className="shadow-sm p-2" />
                <input ref={nationalId} placeholder="الرقم القومي" className="shadow-sm p-2" />
                <input ref={birthDate} placeholder="تاريخ الميلاد" type="date" className="shadow-sm p-2" />
                <input ref={address} placeholder="العنوان" type="string" className="shadow-sm p-2" />
                <input ref={branch} placeholder="الفرع التابع له" className="shadow-sm p-2" />
                <input type="submit" value="تأكيد" className="cursor-pointer bg-slate-200 p-2" />
            </form>
        </>
    )
}