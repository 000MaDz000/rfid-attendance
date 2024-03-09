import { Link } from "react-router-dom";

export default function CardDataTable({ cardId, cardData, withoutLink }: { withoutLink?: boolean, cardId: string, cardData: { [key: string]: string | undefined } }) {
    return (
        <table>
            <thead>
                <tr>
                    <th className="p-4 text-center">رقم الكارت</th>
                    <th className="p-4 text-center">الاسم</th>
                    <th className="p-4 text-center">العنوان</th>
                    <th className="p-4 text-center">الرقم القومي</th>
                    <th className="p-4 text-center">الفرع التابع له</th>

                    {!withoutLink && <th className="p-4 text-center">صفحة الموظف</th>}
                </tr>
            </thead>

            <tbody>
                <tr>
                    <td className="p-4 text-center">{cardId}</td>
                    <td className="p-4 text-center">{cardData.name || "-"}</td>
                    <td className="p-4 text-center">{cardData.address || "-"}</td>
                    <td className="p-4 text-center">{cardData.nationalId || "-"}</td>
                    <td className="p-4 text-center">{cardData.branch || "-"}</td>
                    {!withoutLink && (
                        <td className="text-center">
                            <Link to={`/${cardId}`} className="p-4 text-md bg-blue-700 cursor-pointer text-white rounded-lg">
                                انتقال
                            </Link>
                        </td>
                    )}
                </tr>
            </tbody>
        </table>
    )
}