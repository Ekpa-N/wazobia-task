import * as SharedButtonTypes from "@/lib/sharedTypes"


export default function EditorButton({children, isActive, onClick}:SharedButtonTypes.EditorButtonProps) {
    return (
        <button onClick={()=>{onClick()}} className={`${isActive ? " bg-[#343E37] text-[#fafafa]" : "bg-[#fafafa] text-[#343E37]"} grow borde flex items-center justify-center w-[30px] h-[30px] `}>
            {children}
        </button>
    )
}
