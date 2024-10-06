"use client"
import { useRef, useState } from "react";
import { IoClose } from "react-icons/io5";
import AppContext from "./ContextProvider";


type EmbedContainerProps = {
    embedModal: { type: string, isOpen: boolean };
    handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
    imageString: string | null | ArrayBuffer;
    embedImage: () => void;
    embedVideo: (url: string) => void;
}

export default function EmbedContainer({ embedModal, handleImageUpload, imageString, embedImage, embedVideo }: EmbedContainerProps) {
    const [videourl, setVideourl] = useState<{ provider: string, url: string }>({ provider: "", url: "" })
    const fileInputRef = useRef<HTMLInputElement>(null)

    function handleUrlInputChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        setVideourl({ ...videourl, [e.target.name]: e.target.value })
    }


    const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        if (fileInputRef.current) {
            fileInputRef.current.click()
        }
    }

    function onMediaEmbed(media: string, modalHandler: () => void) {
        // debugger
        switch (media) {
            case "image":
                embedImage();
                break;
            case "video":
                embedVideo(videourl.url);
                break;
            default:
                console.warn(`Unsupported media type: ${media}`);
                return
        }
        modalHandler()
    }
    const { isOpen, type } = embedModal
    return (
        <AppContext.Consumer>
            {({ handleEmbedModal }) => {
                return (
                    <div className={`z-[50] absolute h-full w-full flex items-center top-0 justify-center`}>
                        <div className="absolute w-full h-full bg-[#000000] opacity-[0.25]"></div>
                        <div className="w-[350px] p-[24px] rounded-[4px] relative bg-white flex flex-col md:w-[659px] h-[336px]">
                            <div className="flex justify-between">
                                <h2>Embed</h2>
                                <button onClick={() => { handleEmbedModal(false) }}>
                                    <IoClose size={24} />
                                </button>
                            </div>

                            {type === "image" && (
                                <>
                                    <h2 className="mt-[16px] text-[14px] font-[600]">Upload Image</h2>
                                    <h2 className="mt-[16px] text-[10px]">FILE UPLOAD</h2>

                                    <div className="flex mt-[9px] items-center justify-center w-full">
                                        <label style={{ backgroundImage: `url(${imageString})` }} htmlFor="dropzone-file" className="flex flex-col items-center bg-center bg-contain bg-no-repeat justify-center w-full h-[141px] border-2 border-[#0A7227] border-dashed rounded-lg cursor-pointer bg-[#FAFAFA]">
                                            <button onClick={(e) => {
                                                handleButtonClick(e)
                                            }} className={`flex flex-col border border-[#6CAA7D] text-[#343E37] text-[12px] w-[146px] h-[30px] bg-white items-center justify-center rounded-[4px] ${imageString && "opacity-[0.3]"}`}>
                                                Import Image from Device
                                            </button>
                                            <input ref={fileInputRef} onChange={(e) => { handleImageUpload(e) }} id="dropzone-file" type="file" className="hidden" />
                                        </label>
                                    </div>
                                </>
                            )}
                            {type === "video" && (
                                <>
                                    <label className="mt-[16px] text-[10px]">FILE UPLOAD</label>
                                    <select
                                        onChange={(e) => { handleUrlInputChange(e) }}
                                        name="provider"
                                        value={videourl.provider}
                                        className="pl-[5px] text-[12px] text-[#343E37] outline-none border border-[#E7F1E9] bg-[#FAFAFA] h-[34px] rounded-[4px]"
                                    >
                                        {["Select a provider", "Youtube"].map((item, index) => (
                                            <option
                                                key={item}
                                                value={index === 0 ? "" : item}
                                                disabled={index === 0}
                                            >
                                                {item}
                                            </option>
                                        ))}
                                    </select>
                                    <label htmlFor="url" className="mt-[16px] text-[10px]">URL</label>
                                    <input value={videourl.url} onChange={(e) => { handleUrlInputChange(e) }} name="url" className="pl-[5px] text-[12px] text-[#343E37] outline-none border border-[#E7F1E9] bg-[#FAFAFA] h-[34px] rounded-[4px]" />
                                </>
                            )}


                            <div className="absolute flex gap-[12px] bottom-[24px]">
                                <button onClick={() => { onMediaEmbed(type, handleEmbedModal) }} className="bg-[#0A7227] w-[78px] rounded-[4px] h-[35px] text-white flex items-center justify-center text-[14px]">Embed</button>
                                <button className="w-[78px] h-[35px] flex items-center rounded-[4px] text-[#343E37] border border-[#CEE3D4] justify-center">Cancel</button>
                            </div>

                        </div>
                    </div>
                )
            }}
        </AppContext.Consumer>
    )
}