import { useContext, useEffect, useState } from "react"
import { PopulatedCardData } from "../../main/db-handler/card"
import RfidStorage from "../classes/rfid-storage";
import Modal from "./modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import EmployeeCardsContext from "../contexts/employee-cards";

export default function EmployeeCards({ employeeId }: { employeeId: string }) {
    const { cards, setCards } = useContext(EmployeeCardsContext);

    const [isLoading, setIsLoading] = useState(true);
    const [delSure, setDelSure] = useState("");

    const delCard = (cardId: string) => {
        if (delSure) {
            RfidStorage.deleteCard(cardId).then(() => {
                setCards(cards.filter((c) => c.id !== cardId));
                setDelSure("");
            });
        }
        else {
            setDelSure(cardId);
        }
    }

    useEffect(() => {
        RfidStorage.getAllCards().then(cards => {
            setCards(
                [
                    ...cards.filter((val) => val.employee?.id === employeeId),
                ]
            );
            setIsLoading(false);
        });
    }, []);

    const traversedHashmap: { [key: string]: undefined } = {};

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>معرف الكارت</th>
                        <th>تاريخ الاضافة</th>
                        <th>حذف</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        isLoading ?
                            <tr><td colSpan={3}>Loading...</td></tr> :
                            cards.length ? cards.map((card) => {
                                if (card.id in traversedHashmap) return undefined;
                                traversedHashmap[card.id] = undefined;
                                return (
                                    <tr key={card.id}>
                                        <td className="p-4 text-center">{card.id}</td>
                                        <td className="p-4 text-center">{new Date(card.date).toLocaleDateString()}</td>
                                        <td className="p-4 text-center">
                                            <button onClick={() => delCard(card.id)}>حذف</button>
                                        </td>
                                    </tr>
                                )

                            }) : (
                                <tr>
                                    <td className="p-4 text-center">-</td>
                                    <td className="p-4 text-center">-</td>
                                    <td className="p-4 text-center">-</td>
                                </tr>
                            )
                    }
                </tbody>
            </table>

            {
                delSure ? (
                    <Modal background="bg-gray-200 bg-opacity-1">
                        <div className="flex flex-col items-start gap-7 text-white">
                            <button className="py-1 px-3 rounded-md bg-green-700 translate-x-[100%]" onClick={() => setDelSure("")}>
                                <FontAwesomeIcon icon={faX} />
                            </button>
                            <button className="p-2 px-4 bg-red-700 rounded-md text-white" onClick={() => delCard(delSure)}>هل تريد حذف الكارت بالتأكيد ؟</button>
                            <h3 className="text-black">رقم الكارت: {delSure}</h3>
                        </div>
                    </Modal>
                ) : ""
            }
        </>
    )
}