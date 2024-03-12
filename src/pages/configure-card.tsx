import { useNavigate, useParams } from "react-router";
import CreateEmployeeForm from "../components/create-employee-form";
import RfidStorage from "../classes/rfid-storage";

export default function ConfigureCard() {
    const { cardId } = useParams();
    const cardData = RfidStorage.getCardData(cardId as string);
    const navigate = useNavigate();
    cardData.then(val => {
        if (val.employee) {
            navigate("/employee/" + val.employee.id);
        }
    })
    return (
        <div className="relative w-full h-full p-4 flex justify-center items-center">
            <CreateEmployeeForm id={cardId as string} />
        </div>
    )
}