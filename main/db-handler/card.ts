import { app } from "electron"
import { join } from "path"
import Employee, { EmployeeData } from "./employee";
import { mkdirSync, readFileSync, readdirSync, unlinkSync, writeFileSync } from "fs";

export type CardData = {
    id: string;
    employee: string;
    date: string;
}

export type PopulatedCardData = {
    employee: EmployeeData | null;
    id: string;
    date: string;
}

export default class RfidCard {
    constructor(public rfid: string) {

    }



    static getFolder() {
        const folder = join(app.getAppPath(), "../", "../", "db", "cards");
        try {
            mkdirSync(folder, { recursive: true });
        }
        catch (err) {

        }

        return folder;
    }

    static getAllCards() {
        const folder = RfidCard.getFolder();
        try {
            const cards = readdirSync(folder);
            return cards.map(card => {
                return new RfidCard(card.slice(0, card.lastIndexOf(".json"))).getPopulatedCardData();
            });
        }
        catch (err) {
            return [];
        }
    }
    getCardPath() {
        return join(RfidCard.getFolder(), this.rfid + ".json");
    }

    getCardData() {
        try {
            const cardPath = this.getCardPath();
            const data = readFileSync(cardPath);
            const parsedData: CardData = JSON.parse(data.toString());
            return parsedData;
        }
        catch (err) {
            return null;
        }
    }

    setCardData(data: Omit<CardData, "id">) {
        try {
            const cardPath = this.getCardPath();
            let cardData = this.getCardData();


            cardData = {
                id: this.rfid,
                ...data,
            }

            writeFileSync(cardPath, JSON.stringify(cardData));
        }
        catch (err) {

        }
    }

    getPopulatedCardData() {
        const data = this.getCardData();
        if (!data) return {};

        const populated: PopulatedCardData = {
            ...data,
            employee: new Employee(data.employee).getEmployeeData(),
        }

        return populated;
    }

    deleteCard() {
        const path = this.getCardPath();
        try {
            unlinkSync(path);
        }
        catch (err) {

        }
    }

}