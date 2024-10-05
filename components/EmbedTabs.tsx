"use client"

import { ReactNode } from "react"

type EmbedTabProps = {
    icon: ReactNode;
    title: string;
    formats: string[];
    type: string;
    onClick: (state: boolean, type: string) => void;
}


export default function EmbedTab({ icon, title, formats, type, onClick }: EmbedTabProps) {
    const formatList = formats.join(", ")
    return (
        <li onClick={()=>{onClick(true, type)}} className="flex pl-[10px] borde pt-[5px] cursor-pointer gap-[5px] h-[46px] w-full hover:bg-[#F7FCF8]">
            <div className="borde pt-[2px]">
                {icon}
            </div>
            <div className="flex flex-col borde">
                <h2 className="text-[12px] font-[600] text-[#010E05] borde">{title}</h2>
                <h2 className="text-[8px] text-[#343E37]">{formatList}</h2>
            </div>
        </li>
    )
}