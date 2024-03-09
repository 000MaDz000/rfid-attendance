export default class RfidStorage {
    static getCardData(id: string | null) {
        if (!id) return null;
        const stringData = localStorage.getItem(id);
        if (!stringData) return null;
        return JSON.parse(stringData);
    }

    static setCardData(id: string, data: object) {
        localStorage.setItem(id, JSON.stringify(data));
    }

    static getAllCards() {
        const allData = Object.keys(localStorage);
        const clearedData: string[] = [];
        allData.forEach(val => {
            if (val.match(/^000[0-9]{7}$/)) {
                clearedData.push(val);
            }
        });

        return clearedData;
    }
}