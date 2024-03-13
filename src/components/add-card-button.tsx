import { faPlus, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import Modal from "./modal";
import useRfid from "../hooks/use-rfid";
import RfidStorage from "../classes/rfid-storage";
import EmployeeCardsContext from "../contexts/employee-cards";

export default function AddCardButton({ employeeId }: { className?: string, employeeId: string, }) {
    const [isClicked, setIsClicked] = useState(false);
    const { cards, setCards } = useContext(EmployeeCardsContext);
    const rfid = useRfid();

    useEffect(() => {
        if (!isClicked || !rfid) return;
        setIsClicked(false);
        RfidStorage.setCardData(rfid, employeeId).then(() => {
            return RfidStorage.getCardData(rfid);
        }).then(data => {
            setCards([...cards, data]);
        })

    }, [rfid, employeeId,]);
    return (
        <div>
            <FontAwesomeIcon icon={faPlus} title="اضافة كارت" className="cursor-pointer" onClick={() => setIsClicked(true)} />
            {
                isClicked && (
                    <Modal background="bg-black">
                        <div className=" ">
                            <button onClick={() => setIsClicked(false)} title="الغاء" className="translate-x-[200%] text-white bg-red-700 px-2 py-1 rounded-md">
                                <FontAwesomeIcon icon={faX} />
                            </button>
                            <h1 className="text-white font-semibold">
                                يرجى ادخال كارت RFID
                            </h1>
                        </div>
                    </Modal>
                )
            }
        </div>
    )
}