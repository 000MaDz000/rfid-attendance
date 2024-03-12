import { randomUUID } from "crypto";
import { app } from "electron";
import { mkdirSync, readFileSync, readdirSync, writeFileSync } from "fs";
import { join } from "path";

export type DayData = {
    [key: string]: {
        from: string,
        to?: string,
    }
};

export type EmployeeData = {
    id: string,
    name: string,
    branch: string,
    address: string,
    birthDate: Date,
    nationalId: string,
}

export type PopulatedDayData = {
    employee: EmployeeData,
    from: string,
    to?: string,
}[]
export default class Employee {
    constructor(public employeeId: string) { }

    public getEmployeeData(): EmployeeData | null {
        const employeesPath = Employee.getEmployeesFolder();
        const employeePath = join(employeesPath, this.employeeId + ".json");
        try {
            const data = readFileSync(employeePath).toString();
            return JSON.parse(data);
        }
        catch (err) {
            return null;
        }
    }

    public makeAttendance(attendance: Date) {
        try {
            let data: DayData = Employee.getDayData();
            data[this.employeeId] = { from: attendance.toString() };
            Employee.setDayData(data);
        }
        catch (err) {

        }
    }

    public makeDeparture(departure: Date) {
        try {
            const dayData = Employee.getDayData() as DayData;
            const employeeData = dayData[this.employeeId];
            if (employeeData) {
                employeeData.to = departure.toString();
                dayData[this.employeeId] = employeeData;
                Employee.setDayData(dayData);
            }


        }
        catch (err) {

        }

    }

    static setDayData(data: DayData) {
        try {
            const { path } = Employee.getDayFile();
            writeFileSync(path, JSON.stringify(data));
        }
        catch (err) {

        }
    }

    static getDayData(day?: number, month?: number,): DayData {
        let { folder, path } = Employee.getDayFile();

        if (month) {
            folder = join(folder, "../", month.toString());
            try {
                mkdirSync(folder, { recursive: true })
            }
            catch (err) { }
        }

        try {
            if (day) {
                const path = join(folder, day + ".json");
                const data = readFileSync(path);
                return JSON.parse(data.toString());
            }
            else {
                const data = readFileSync(path);
                return JSON.parse(data.toString());
            }
        }
        catch (err) {
            return {};
        }
    }

    static getPoulatedDayData(...params: any) {
        const data = this.getDayData(...params);
        const populated: PopulatedDayData = [];
        for (const key in data) {
            const populatedEmployee = {
                employee: new Employee(key).getEmployeeData(),
                from: data[key].from,
                to: data[key].to,
            }

            populated.push(populatedEmployee as any);
        }

        return populated;
    }

    static getMonthData(month?: number) {
        try {
            const data = new Array<PopulatedDayData>(31);

            for (let i = 0; i < 31; i++) {
                data[i] = this.getPoulatedDayData(i + 1, month)

            }

            return data;
        }
        catch (err) {
            return [];
        }
    }

    static getDayFile() {
        const time = new Date();
        const year = time.getFullYear();
        let month = time.getMonth() + 1;
        const day = time.getDate();
        const folder = join(app.getAppPath(), "../", "../", "db", "attendance", year.toString(), month.toString());
        const path = join(folder, day + ".json");

        try {
            mkdirSync(folder, { recursive: true });
        }
        catch (err) { }
        return {
            time,
            year,
            month,
            folder,
            path,
        }
    }

    static getEmployeesFolder() {
        const dir = join(app.getAppPath(), "../", "../", "db", "employees");
        try {
            mkdirSync(dir, { recursive: true });
        }
        catch (err) {

        }
        return dir;
    }

    static getEmployees() {
        const folder = Employee.getEmployeesFolder();
        try {
            const employeesIds = readdirSync(folder);
            const data = employeesIds.map(id => {
                id = id.slice(0, id.lastIndexOf(".")); // remove .json from the filename
                return new Employee(id).getEmployeeData();
            });

            return data;
        }
        catch (err) {
            return [];
        }
    }

    static create(name: string, nationalId: string, birthDate: Date, address: string, branch: string) {
        try {
            const id = randomUUID();
            const folder = Employee.getEmployeesFolder();
            const data = {
                id,
                name,
                branch,
                address,
                birthDate,
                nationalId,
            };
            const jsonData = JSON.stringify(data);

            writeFileSync(join(folder, id + ".json"), jsonData);

            return data;
        }
        catch (err) {
            return null;
        }
    }
}