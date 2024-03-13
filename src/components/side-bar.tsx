import { faHome, faIdCard, faPerson, } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
    const homePageLink = useRef<HTMLAnchorElement>(null);
    useEffect(() => {
        homePageLink.current?.click();
    }, []);
    return (
        <aside className="flex-grow-[0.4] max-w-60 flex p-3 pt-10 pb-10 flex-col bg-gray-200 h-screen gap-4 text-lg">
            <NavLink className={"flex justify-between [&.active]:font-semibold"} to="/" ref={homePageLink}>الصفحة الرئيسية <FontAwesomeIcon icon={faHome} /></NavLink>
            <NavLink className={"flex justify-between [&.active]:font-semibold"} to="/employees" >الموظفين<FontAwesomeIcon icon={faPerson} /></NavLink>
            <NavLink className={"flex justify-between [&.active]:font-semibold"} to="/cards" >كروت RFID<FontAwesomeIcon icon={faIdCard} /></NavLink>
        </aside>
    )
}