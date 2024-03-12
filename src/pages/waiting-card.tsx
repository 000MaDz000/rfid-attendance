import { useNavigate } from "react-router";
import useRfid from "../hooks/use-rfid";
import RfidStorage from "../classes/rfid-storage";
import Employee from "../classes/employee";

export default function WaitingCard() {
    const card = useRfid();
    const navigate = useNavigate();
    if (card) {
        RfidStorage.getCardData(card).then(data => {
            if (data?.employee) {
                new Employee(data.employee.id).makeAttendance().then(() => {

                    navigate("/employees/" + (data.employee?.id || ""));
                })
            }
            else {
                navigate("/configure-card/" + card);
            }
        });
    }
    return (
        <div className="h-screen flex items-center justify-center">

            <h2>جار انتظار ادخال كارت RFID</h2>
        </div>
    )
}