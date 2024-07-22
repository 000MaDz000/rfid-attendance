import { IpcRenderer } from 'electron';
import { EmployeeData, PopulatedDayData } from '../../main/db-handler/employee';
const ipcRenderer = window.require("electron").ipcRenderer as IpcRenderer;

export default class Employee {
    constructor(public id: string) { }

    async getEmployeeData(): Promise<EmployeeData | null> {
        return await ipcRenderer.invoke("get-employee-data", this.id);
    }
    static getAttendances(month?: number, day?: number): Promise<PopulatedDayData[] | PopulatedDayData> {
        return ipcRenderer.invoke("get-attendances", { month, day });
    }

    static async getEmployees(): Promise<EmployeeData[]> {
        return await ipcRenderer.invoke("get-employees");
    }
    static async create(employeeData: Omit<EmployeeData, "id">): Promise<EmployeeData> {
        return await ipcRenderer.invoke("create-employee", employeeData);
    }

    async makeAttendance() {
        const date = new Date();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const attendances = await Employee.getAttendances(month, day) as PopulatedDayData;
        const employee = attendances.find((val) => {
            return val.employee.id === this.id;
        });

        await ipcRenderer.invoke("make-attendance", this.id);

        // check if the last attendance object marked with to property
        // if not, will return "departure" else will return "attendace"
        const employeeData = employee?.data;

        if (employeeData) {
            if (employeeData[employeeData.length - 1].to) {
                return "attendance";
            }
            else {
                return "departure";
            }
        }
        else {
            return "attendance";
        }
    }
}