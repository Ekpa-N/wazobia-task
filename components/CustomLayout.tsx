"use client"
import { ReactNode, useEffect, useRef, useState } from "react"
import AppContext from "./ContextProvider"
import EmbedContainer from "./Embedcontainer"
import * as helpers from "@/lib/helpers"


type CustomLayoutProps = {
    children: ReactNode
}
export default function CustomLayout({ children }: CustomLayoutProps) {
    const [isFocused, setIsFocused] = useState<boolean>(false)
    const [embedModal, setEmbedModal] = useState<{ type: string, isOpen: boolean }>({ type: "", isOpen: false })
    const [imageString, setImageString] = useState<string | ArrayBuffer | null>("")
    const [embedTabList, setEmbedTabList] = useState<boolean>(false)
    const editorRef = useRef<HTMLDivElement>(null)
    const layoutRef = useRef<HTMLInputElement>(null)
    const embedButtonRef = useRef<HTMLButtonElement>(null)

    function handleEmbedTab() { }
    function handleEmbedTabList() {
        setEmbedTabList(!embedTabList)
    }

    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            if (editorRef.current && editorRef.current.contains(event.target as Node)) {
                setIsFocused(true)
                // console.log("embed button: ", embedButtonRef)
            } else {
                setIsFocused(false)
                setEmbedTabList(false)
                console.log("target: ", event.target)
            }

        }

        window.addEventListener("click", handleClick)
        return () => {
            window.removeEventListener("click", handleClick);
        };
    }, [])

    function handleFocus() {
        setIsFocused(true)
    }

    async function handleImageUpload(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0]

        if (file) {
            try {
                const imageString = await helpers.imageToString(file)
                setImageString(imageString)

            } catch (error) {
                console.error(error)
            }
        }
    }

    function handleEmbedModal(state: boolean, type: string) {
        setEmbedModal({ ...embedModal, isOpen: state, type: type })
    }




    return (
        <AppContext.Provider value={{ handleFocus, layoutRef, isFocused, editorRef, embedModal, handleImageUpload, imageString, handleEmbedModal, embedButtonRef, embedTabList, handleEmbedTabList }}>
            <div ref={layoutRef} className="w-full h-full overflow-x-hidden relative">
                {children}
            </div>
        </AppContext.Provider>
    )
}