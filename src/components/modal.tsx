import { PropsWithChildren } from "react";

export default function Modal({ children }: PropsWithChildren) {
    return (
        <div className="absolute h-full w-full bg-inherit">
            <div className="relative w-full h-full">
                <div className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]">
                    {children}
                </div>
            </div>
        </div>
    )
}