import { createContext } from "react";
import { PopulatedCardData } from "../../main/db-handler/card";

const EmployeeCardsContext = createContext<{
    setCards: (cards: PopulatedCardData[]) => void,
    cards: PopulatedCardData[],
}>({ "cards": [], "setCards": () => { } })


export default EmployeeCardsContext;