import { useNavigate, useParams } from "react-router";
import CreateEmployeeForm from "../components/create-employee-form";
import RfidStorage from "../classes/rfid-storage";

export default function ConfigureCard() {
    const { cardId } = useParams();
    const cardData = RfidStorage.getCardData(cardId as string);
    const navigate = useNavigate();
    if (cardData) {
        navigate("/" + cardId)
    }
    return (
        <div className="h-screen flex items-center justify-center">
            <CreateEmployeeForm id={cardId as string} />
        </div>
    )
}