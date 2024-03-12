import { PropsWithChildren } from "react";

export default function Modal({ children, background }: PropsWithChildren & { background?: string }) {
    return (
        <div className={"fixed w-screen h-screen top-0 left-0 bg-opacity-70 " + (background ? background : "bg-inherit")}>
            <div className="relative w-full h-full">
                <div className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] max-w-full max-h-full">
                    {children}
                </div>
            </div>
        </div>
    )
}