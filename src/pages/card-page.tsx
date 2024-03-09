import { useNavigate, useParams } from "react-router";
import RfidStorage from "../classes/rfid-storage";
import CardDataTable from "../components/card-data-table";
import AttendanceTable from "../components/attendance-table";

export default function CardPage() {
    const { cardId } = useParams();
    const cardData = RfidStorage.getCardData(cardId as string);
    const navigate = useNavigate();
    if (!cardData) {
        navigate("/configure-card/" + cardId);
        return <></>;
    }

    return (
        <div className="flex flex-col h-screen p-4 gap-20">
            <section className="gap-14 flex flex-col">
                <h1 className="font-bold text-xl text-slate-800">بيانات الموظف</h1>
                <CardDataTable cardId={cardId as string} cardData={cardData} withoutLink />
            </section>

            <section className="gap-14 flex flex-col">
                <h1 className="font-bold text-xl text-slate-800">مواعيد الحضور و الانصراف</h1>
                <AttendanceTable />
            </section>
        </div>
    )
}