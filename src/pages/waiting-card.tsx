import { useNavigate } from "react-router";
import Modal from "../components/modal";
import useRfid from "../hooks/use-rfid";

export default function WaitingCard() {
    const card = useRfid();
    const navigate = useNavigate();
    if (card) {
        navigate("/" + card);
    }
    return (
        <div className="relative h-screen">
            <Modal>
                <h2>جار انتظار ادخال كارت RFID</h2>
            </Modal>
        </div>
    )
}