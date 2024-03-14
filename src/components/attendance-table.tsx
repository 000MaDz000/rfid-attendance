import { Fragment, useCallback, useEffect, useState } from "react";
import { useParams } from "react-router"
import Employee from "../classes/employee";
import { PopulatedDayData } from "../../main/db-handler/employee";
import numberToTime from "../functions/number-to-time";

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

    const employeeData = useCallback(() => {
        return data.map(day => {
            return day.find(entry => entry.employee.id === employeeId);
        })
    }, [data])();

    return (

        <table className="border-separate border-spacing-2 [&_td]:text-center [&_td]:p-4 [&_th]:text-center [&_th]:p-4">
            <thead>
                <tr>
                    <th>اليوم</th>
                    <th>الحضور</th>
                    <th>الانصراف</th>
                    <th>اجمالي عدد الساعات</th>
                </tr>
            </thead>

            <tbody>
                {
                    // here we iterate all attendances objects of the employee
                    employeeData.map((val, i) => {
                        let totalHours = 0;
                        let totalMinutes = 0;
                        let totalSeconds = 0;

                        // if there is no data in this day, just ignore it
                        if (!val?.data.length) {
                            return (
                                <Fragment key={i}>

                                </Fragment>
                            )
                        }

                        return (
                            <Fragment key={i}>
                                {/* creating a row that contains only day number */}
                                {/* and it's height equals attendances array length + 1 because of the total time of the day */}
                                <tr>
                                    <td rowSpan={(val?.data.length) ? val.data.length + 2 : undefined} className="bg-white">{i + 1}</td>
                                </tr>

                                {/* iterate over all attendances objects */}
                                {val?.data.map((val, j) => {
                                    const startData = new Date(val.from);
                                    const endDate = new Date(val.to || "");
                                    const defference = new Date(endDate.getTime() - startData.getTime());
                                    const hours = defference.getUTCHours();
                                    const minutes = defference.getUTCMinutes();
                                    const seconds = defference.getUTCSeconds();
                                    const defStr = `${numberToTime(hours)}:${numberToTime(minutes)}:${numberToTime(seconds)}`;
                                    totalHours += hours;
                                    totalMinutes += minutes;
                                    totalSeconds += seconds;

                                    // render (attendance, departure, total) times
                                    return (
                                        <tr key={j}>
                                            <td>{startData.toLocaleTimeString()}</td>
                                            <td>{val.to ? endDate.toLocaleTimeString() : "-"}</td>
                                            <td>{(val.to && val.from) ? defStr : "-"}</td>
                                        </tr>
                                    )
                                })}

                                {/* render the total horse of the day */}
                                {
                                    val?.data.length ? (
                                        <tr >
                                            <td></td>
                                            <td></td>
                                            <td className="font-semibold">{`${numberToTime(totalHours)}:${numberToTime(totalMinutes)}:${numberToTime(totalSeconds)}`}</td>
                                        </tr>
                                    ) : ""
                                }
                            </Fragment>
                        )
                    })
                }
            </tbody>
        </table>

    )
}