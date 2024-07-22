import { useEffect, useState } from "react";
import RfidEventListener, { RfidListener } from "../events/rfid";

export default function useRfid() {
    const [state, setState] = useState<string | null>(null);
    useEffect(() => {
        const listener: RfidListener = (ev) => {
            setState(ev.id);
            setTimeout(() => {
                setState(null);
            }, 1000);
        };

        RfidEventListener.addListener(listener);

        return () => {
            RfidEventListener.removeListener(listener);
        }
    });

    return state;
}