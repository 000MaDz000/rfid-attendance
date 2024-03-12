import { useParams } from "react-router";
import EmployeeTable from "../components/employee-data-table";
import AttendanceTable from "../components/attendance-table";
import { useEffect, useState } from "react";
import Loading from "../components/loading";
import Employee from "../classes/employee";
import { EmployeeData } from "../../main/db-handler/employee";
import EmployeeCards from "../components/employee-cards";
import AddCardButton from "../components/add-card-button";
import { PopulatedCardData } from "../../main/db-handler/card";
import EmployeeCardsContext from "../contexts/employee-cards";

export default function EmployeePage() {
    const { employeeId } = useParams();
    const [employeeData, setEmployeeData] = useState<EmployeeData>();
    const [employeeCards, setEmployeeCards] = useState<PopulatedCardData[]>([]);

    useEffect(() => {
        new Employee(employeeId as string).getEmployeeData().then(data => {
            setEmployeeData(data as EmployeeData);
        });
    }, [employeeId]);

    return (
        employeeData ?

            <div className="flex flex-col h-screen p-4 gap-20 m-auto">

                <section className="gap-14 flex flex-col bg-gray-100 p-4">

                    <EmployeeCardsContext.Provider value={{
                        "cards": employeeCards, setCards: (cards) => {
                            setEmployeeCards(cards);
                        }
                    }}>
                        <div className="gap-14 flex flex-col">

                            <h1 className="font-bold text-xl text-slate-800">كروت RFID المربوطة</h1>
                            <EmployeeCards employeeId={employeeData.id} />
                        </div>
                        <AddCardButton employeeId={employeeId as string} />
                    </EmployeeCardsContext.Provider>
                </section>




                <section className="gap-14 flex flex-col bg-gray-100 p-4">
                    <h1 className="font-bold text-xl text-slate-800">بيانات الموظف</h1>
                    <EmployeeTable employee={employeeData} withoutLink />
                </section>

                <section className="gap-14 flex flex-col bg-gray-100 p-4">
                    <h1 className="font-bold text-xl text-slate-800">مواعيد الحضور و الانصراف</h1>
                    <AttendanceTable />
                </section>
            </div>
            : <Loading />
    )
}