import { IpcRenderer } from 'electron';
import { PopulatedCardData } from "../../main/db-handler/card"
const ipcRenderer = window.require("electron").ipcRenderer as IpcRenderer;

export default class RfidStorage {
    static async getCardData(id: string | null): Promise<PopulatedCardData> {
        const cardData = await ipcRenderer.invoke("rfid-data", id);
        return cardData;
    }

    static async setCardData(id: string, employeeId: string): Promise<void> {
        const result = await ipcRenderer.invoke("configure-card", id, employeeId);
        return result;
    }

    static async getAllCards(): Promise<PopulatedCardData[]> {
        return ipcRenderer.invoke("get-cards");
    }

    static async deleteCard(cardId: string) {
        return ipcRenderer.invoke("delete-card", cardId);
    }
}