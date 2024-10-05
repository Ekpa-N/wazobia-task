import * as SharedButtonTypes from "@/lib/sharedTypes"
import { buttons } from "@/lib/constantVariables"
import EditorButton from "./EditorButton"
import { RefObject } from "react"
import { Editor } from "@tiptap/react"
import TextAlign from "@tiptap/extension-text-align"



type FormatBarProps = {
    isFocused: boolean;
    editor: Editor | null
}

export default function FormatBar({ isFocused, editor}:FormatBarProps) {

    function onClickFormatButton(task: string) {
        switch(task) {
            case "bold":
                return editor?.chain().focus().toggleBold().run()
            case "italic":
                return editor?.chain().focus().toggleItalic().run()
            case "bulletList":
                return editor?.chain().focus().toggleBulletList().run()
            case "orderedList":
                return editor?.chain().focus().toggleOrderedList().run()
            case "left":
                return editor?.chain().focus().setTextAlign("left").run()
            case "right":
                return editor?.chain().focus().setTextAlign("right").run()
            case "center":
                return editor?.chain().focus().setTextAlign("center").run()
            case "italic":
                return editor?.chain().focus().toggleItalic().run()
            case "italic":
                return editor?.chain().focus().toggleItalic().run()
        }
    }
    return (
        <div className={`border ${isFocused ? "flex" : "hidden"} h-[30px] overflow-hidden bg-[#ffffff]  items-center w-fit rounded-[6px]`}>
            {buttons.map((buttonsArray: SharedButtonTypes.EditorButtonUI[], index: number)=>{
                return(
                    <div className={`borde  flex`}>
                        {buttonsArray.map(({task, icon}:SharedButtonTypes.EditorButtonUI, index: number)=>{
                            return (
                                <EditorButton isActive={editor?.isActive(task) || editor?.isActive({textAlign: task})} onClick={()=>{onClickFormatButton(task)}}>
                                    {icon}
                                </EditorButton>
                            )
                        })}
                    </div>
                )
            })}
        </div>
    )
}