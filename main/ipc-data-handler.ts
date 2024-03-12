import { ipcMain } from "electron/main";
import RfidCard from "./db-handler/card";
import Employee, { EmployeeData } from "./db-handler/employee";

ipcMain.handle("rfid-data", (_ev, id: string) => {
    if (!id) return
    const data = new RfidCard(id).getPopulatedCardData();
    return data;
});

ipcMain.handle("configure-card", (_ev, cardId, employeeId) => {
    new RfidCard(cardId).setCardData({ employee: employeeId, date: new Date().toString() });
    return true;
});

ipcMain.handle("create-employee", (_ev, employeeData: EmployeeData) => {
    return Employee.create(
        employeeData.name,
        employeeData.nationalId,
        employeeData.birthDate,
        employeeData.address,
        employeeData.branch
    );
});

ipcMain.handle("get-employee-data", (_ev, id) => {
    return new Employee(id).getEmployeeData();
});

ipcMain.handle("make-attendance", (_ev, employeeId) => {
    // store the attendance time as a floating point number
    const date = new Date();
    new Employee(employeeId).makeAttendance(date);
    return true;
});

ipcMain.handle("make-departure", (_ev, employeeId) => {
    // store the attendance time as a floating point number
    const date = new Date();
    new Employee(employeeId).makeDeparture(date);
    return true;
});

ipcMain.handle("get-attendances", (_ev, data: { month: number, day?: number }) => {
    if (!data) {
        return Employee.getPoulatedDayData();
    }
    else if (data.day) {
        return Employee.getPoulatedDayData(data.day, data.month);
    }
    else {
        return Employee.getMonthData(data.month);
    }
});

ipcMain.handle("get-employees", () => {
    return Employee.getEmployees();
})

ipcMain.handle("get-cards", () => {
    return RfidCard.getAllCards();
})

ipcMain.handle("delete-card", (_ev, cardId) => {
    new RfidCard(cardId).deleteCard();
}); 