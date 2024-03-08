import { createGlobalKeyListener } from "global-key-listener";
import KeyboardLikeReadersEvents from "./keyboard-like-readers";

const listener = createGlobalKeyListener();
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

listener.addListener((ev) => {
    if (ev.state == "DOWN") return;
    const current = String.fromCharCode(ev.scanCode);

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

    if (current == "\r") {
        if (id.match(/^000[0-9]{7}$/)) {
            KeyboardLikeReadersEvents.emit("rfid", id);
        }

        id = "";
        timeout = null;
    }

});

