import { Link } from "react-router-dom";
import RfidStorage from "../classes/rfid-storage"

export default function EmployeesPage() {
    const data = RfidStorage.getAllCards();

    console.log(data);

    return (
        <div className="h-full flex items-center justify-center">

            <table>

                <thead>
                    <tr>
                        <th className="p-4">رقم الكارت</th>
                        <th className="p-4">الاسم</th>
                        <th className="p-4">العنوان</th>
                        <th className="p-4">تاريخ الميلاد</th>
                        <th className="p-4">الرقم القومي</th>
                        <th className="p-4">صفحة الموظف</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        data.map(id => {
                            const data = RfidStorage.getCardData(id);
                            return (
                                <tr>
                                    <td className="p-4 text-center text-md">{id}</td>
                                    <td className="p-4 text-center text-md">{data.name}</td>
                                    <td className="p-4 text-center text-md">{data.address || "-"}</td>
                                    <td className="p-4 text-center text-md">{data.birthDate ? new Date(data.birthDate).toLocaleDateString("ar-SA") : "-"}</td>
                                    <td className="p-4 text-center text-md">{data.nationalId || "-"}</td>
                                    <td className="text-center">
                                        <Link to={`/${id}`} className="p-4 text-md bg-blue-700 cursor-pointer text-white rounded-lg">
                                            انتقال
                                        </Link>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}