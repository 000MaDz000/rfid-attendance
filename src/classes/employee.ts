export default class Employee {
    constructor(public cardId: string) { }
    static getAttendances(year: number, month: number, day: number) {
        const attendances = localStorage.getItem(`attendance-${year}-${month}`);
        if (!attendances) return [];
        const parsed = JSON.parse(attendances) as Array<{ card: string, from: number, to: number }>;
        return parsed;
    }

    makeAttendance() {
    }

    makeDeparture() {

    }
}