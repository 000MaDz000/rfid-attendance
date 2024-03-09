import { IpcRenderer } from 'electron';
import { EmployeeData } from '../../main/db-handler/employee';
const ipcRenderer = window.require("electron").ipcRenderer as IpcRenderer;

export default class Employee {
    constructor(public id: string) { }

    static getAttendances(month?: number, day?: number) {
        ipcRenderer.invoke("get-attendances",).then(console.log);
    }

    static async getEmployees(): Promise<EmployeeData[]> {
        return await ipcRenderer.invoke("get-employees");
    }

    async makeAttendance() {
        const employeeId = this.id;
        return await ipcRenderer.invoke("make-attendance", employeeId);
    }

    async makeDeparture() {
        const employeeId = this.id;
        return await ipcRenderer.invoke("make-departure", employeeId);
    }

    async create(employeeData: Omit<EmployeeData, "id">) {
        return await ipcRenderer.invoke("create-employee", employeeData);
    }
}