import { faHome, faPerson, } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
    return (
        <aside className="flex-grow-[0.1] flex p-3 pt-10 pb-10 flex-col bg-gray-200 h-screen">
            <NavLink className={"flex justify-between"} to="/" >الصفحة الرئيسية <FontAwesomeIcon icon={faHome} /></NavLink>
            <NavLink className={"flex justify-between"} to="/employees" >الموظفين<FontAwesomeIcon icon={faPerson} /></NavLink>
        </aside>
    )
}