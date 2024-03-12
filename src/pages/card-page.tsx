import { useEffect, useState } from "react"
import { PopulatedCardData } from "../../main/db-handler/card";
import RfidStorage from "../classes/rfid-storage";
import Modal from "../components/modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

export default function CardPage() {
    const [cards, setCards] = useState<PopulatedCardData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [deleteSure, setDeleteSure] = useState("");
    useEffect(() => {
        RfidStorage.getAllCards().then(cards => {
            setCards(cards);
            setIsLoading(false);
        });
    }, []);

    const deleteCard = (cardId: string) => {
        if (deleteSure) {
            RfidStorage.deleteCard(cardId);
            setCards(cards.filter((c) => c.id !== cardId));
            setDeleteSure("");
        }
        else {
            setDeleteSure(cardId)
        }
    }

    return (

        !isLoading ? (
            <div className="p-3 relative flex justify-center">
                <table className="text-center">
                    <thead>
                        <tr>
                            <th className="p-4 text-">معرف الكارت</th>
                            <th className="p-4 text-">اسم الموظف</th>
                            <th className="p-4 text-">تاريح الاضافة</th>
                            <th className="p-4 text-">حذف</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            cards.map(card => (
                                <tr>
                                    <td className="p-4 text-center">{card.id}</td>
                                    <td className="p-4 text-center">{card.employee?.name}</td>
                                    <td className="p-4 text-center">{card.date || "-"}</td>
                                    <td className="p-2">
                                        <button className="p-4 text-center  bg-blue-600 whitespace-nowrap text-white font-semibold rounded-lg" onClick={() => deleteCard(card.id)}>حذف بيانات الكارت</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>

                {
                    deleteSure &&
                    (
                        <Modal background="bg-gray-200 bg-opacity-1">
                            <div className="flex flex-col items-start gap-7 text-white">
                                <button className="py-1 px-3 rounded-md bg-green-700 translate-x-[100%]" onClick={() => setDeleteSure("")}>
                                    <FontAwesomeIcon icon={faX} />
                                </button>
                                <button className="p-2 px-4 bg-red-700 rounded-md text-white" onClick={() => deleteCard(deleteSure)}>هل تريد حذف الكارت بالتأكيد ؟</button>
                                <h3 className="text-black">رقم الكارت: {deleteSure}</h3>
                            </div>
                        </Modal>
                    )
                }
            </div>
        ) :
            <Modal>
                <h1 className="my-8 mx-6 text-2xl font-bold ">جار التحميل...</h1>
            </Modal>
    )
}