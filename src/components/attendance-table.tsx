import { useEffect, useState } from "react";
import { useParams } from "react-router"
import Employee from "../classes/employee";
import { PopulatedDayData } from "../../main/db-handler/employee";

export default function AttendanceTable() {
    const { employeeId } = useParams();
    const [data, setData] = useState<PopulatedDayData[]>([]);

    useEffect(() => {
        Employee.getAttendances().then((data) => {
            if (data.length) {
                setData(data as any);
            }
        });
    }, []);

    return (

        <table className="">
            <thead>
                <tr>
                    <th className="p-4 text-center">اليوم</th>
                    <th className="p-4 text-center">الحضور</th>
                    <th className="p-4 text-center">الانصراف</th>
                    <th className="p-4 text-center">اجمالي عدد الساعات</th>
                </tr>
            </thead>

            <tbody>
                {data.map((day, i) => {
                    const employee = day.find(val => val.employee.id === employeeId);
                    const from = new Date(employee?.from ?? '');
                    const to = new Date(employee?.to ?? '');
                    const totalHours = (to.getTime() - from.getTime()) / 1000 / 60 / 60;
                    return (
                        <tr key={i}>
                            <td className="p-4 text-center">{i + 1}</td>
                            <td className="p-4 text-center">{from.toLocaleTimeString() === "Invalid Date" ? "-" : from.toLocaleTimeString()}</td>
                            <td className="p-4 text-center">{to.toLocaleTimeString() === "Invalid Date" ? "-" : to.toLocaleTimeString()}</td>
                            <td className="p-4 text-center">{isNaN(totalHours) ? "-" : totalHours.toFixed(2)}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>

    )
}