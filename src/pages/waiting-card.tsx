import { useNavigate } from "react-router";
import useRfid from "../hooks/use-rfid";
import RfidStorage from "../classes/rfid-storage";
import Employee from "../classes/employee";
import Swal from "sweetalert2";
import { useEffect } from "react";

export default function WaitingCard() {
    const card = useRfid();
    const navigate = useNavigate();

    useEffect(() => {
        if (card) {
            RfidStorage.getCardData(card).then(data => {
                if (data?.employee) {
                    new Employee(data.employee.id).makeAttendance().then((val) => {
                        Swal.fire({
                            icon: 'success',
                            html: `<p>تم تسجيل ${val === "attendance" ? "حضور" : "انصراف"}</p><p style="display:flex;justify-content:end; margin:1rem;">اسم الموظف: ${data.employee?.name}</p>`,
                            timer: 1500,
                            position: "bottom-end",
                            width: 400
                        });
                    });
                }
                else {
                    navigate("/configure-card/" + card);
                }
            });
        }
    }, [card]);
    return (
        <div className="h-screen flex items-center justify-center">
            <h2>جار انتظار ادخال كارت RFID</h2>
        </div>
    )
}