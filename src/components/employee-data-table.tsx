import { Link } from "react-router-dom";
import { EmployeeData } from "../../main/db-handler/employee";

export default function EmployeeTable({ withoutLink, employee }: { withoutLink?: boolean, employee: EmployeeData }) {

    return (
        <table>
            <thead>
                <tr>
                    <th className="p-4 text-center">معرف الموظف</th>
                    <th className="p-4 text-center">الاسم</th>
                    <th className="p-4 text-center">العنوان</th>
                    <th className="p-4 text-center">الرقم القومي</th>
                    <th className="p-4 text-center">الفرع التابع له</th>

                    {!withoutLink && <th className="p-4 text-center">صفحة الموظف</th>}
                </tr>
            </thead>

            <tbody>
                <tr>
                    <td className="p-4 text-center">{employee.id}</td>
                    <td className="p-4 text-center">{employee?.name || "-"}</td>
                    <td className="p-4 text-center">{employee?.address || "-"}</td>
                    <td className="p-4 text-center">{employee?.nationalId || "-"}</td>
                    <td className="p-4 text-center">{employee?.branch || "-"}</td>
                    {!withoutLink && (
                        <td className="text-center">
                            <Link to={`/${employee.id}`} className="p-4 text-md bg-blue-700 cursor-pointer text-white rounded-lg">
                                انتقال
                            </Link>
                        </td>
                    )}
                </tr>
            </tbody>
        </table>
    )
}