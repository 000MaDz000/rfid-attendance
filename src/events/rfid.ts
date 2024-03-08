export type RfidListener = (event: RfidEvent) => void;

export class RfidEvent {
    constructor(public id: string) { }
}

const callbacksHashmap: WeakMap<RfidListener, number> = new WeakMap();
const callbacksArray: RfidListener[] = [];

class RfidEventListener {

    static addListener(callback: RfidListener) {
        callbacksArray.push(callback);
        callbacksHashmap.set(callback, callbacksArray.length - 1);
    }

    static emit(id: string) {
        callbacksArray.forEach(callback => {
            callback(new RfidEvent(id));
        });
    }

    static removeListener(listener: RfidListener) {
        const index = callbacksHashmap.get(listener);
        if (index) {
            callbacksArray.splice(index, 1);
        }
    }
}

const numbersHashmap = {
    0: undefined,
    1: undefined,
    2: undefined,
    3: undefined,
    4: undefined,
    5: undefined,
    6: undefined,
    7: undefined,
    8: undefined,
    9: undefined
};
let id = "";
let timeout: number | null = null;
let lastKeyDown: number | null = null;

document.addEventListener("keydown", (ev) => {
    lastKeyDown = Date.now();
});

document.addEventListener("keyup", (ev) => {
    const current = ev.key;

    if (!timeout) {
        timeout = Date.now() + 200;
    }
    else if (timeout - Date.now() >= 0) {
        timeout += 200;
    }
    else {
        id = current;
        timeout = null;
    }


    if (current in numbersHashmap) {
        id += current;
    }

    if (current === "Enter" || Date.now() - (lastKeyDown || 0) >= 40) {

        if (id.match(/^000[0-9]{7}$/)) {
            RfidEventListener.emit(id);
        }

        id = "";
        timeout = null;
    }
    else if (Date.now() - (lastKeyDown || 0) <= 37) {
        ev.preventDefault();
    }
});



export default RfidEventListener;