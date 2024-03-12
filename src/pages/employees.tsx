import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { EmployeeData } from "../../main/db-handler/employee";
import Employee from "../classes/employee";

export default function EmployeesPage() {
    const [data, setData] = useState<EmployeeData[]>([]);

    useEffect(() => {
        Employee.getEmployees().then(setData);
    }, []);

    return (
        data &&
        <div className="h-full flex items-start">

            <table>

                <thead>
                    <tr>
                        <th className="p-4">الاسم</th>
                        <th className="p-4">العنوان</th>
                        <th className="p-4">تاريخ الميلاد</th>
                        <th className="p-4">الرقم القومي</th>
                        <th className="p-4">صفحة الموظف</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        data.map(cardData => {
                            return (
                                <tr>
                                    <td className="p-4 text-center text-md">{cardData.name}</td>
                                    <td className="p-4 text-center text-md">{cardData.address || "-"}</td>
                                    <td className="p-4 text-center text-md">{cardData.birthDate ? new Date(cardData.birthDate).toLocaleDateString("ar-SA") : "-"}</td>
                                    <td className="p-4 text-center text-md">{cardData.nationalId || "-"}</td>
                                    <td className="text-center">
                                        <Link to={`/employees/${cardData.id}`} className="p-4 text-md bg-blue-700 cursor-pointer text-white rounded-lg">
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