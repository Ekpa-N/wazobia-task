"use client"
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import TextEditor from "@/components/TextEditor"
import FormatBar from "@/components/FormatBar";
import AppContext from "@/components/ContextProvider";
import EmbedContainer from "@/components/Embedcontainer";



export default function Home() {

  return (
    <AppContext.Consumer>
      {({ handleFocus, isFocused, editorRef, embedModal, handleImageUpload, imageString, layoutRef, handleEmbedModal, embedButtonRef, embedTabList, handleWordCount}) => {
        return (
          <div className="flex items-center h-full justify-center relative">
            <div className={`border border-[#E7F1E9] bg-[#FAFAFA] mt-[100px] w-[90%] md:w-[662px] md:h-[813px] flex-col flex h-[500px] ${embedModal.isOpen ? "hidden":""}`}>
              <div className="border-b border-[#E7F1E9] h-[30px]"></div>
              <input className="borde bg-[#FAFAFA] text-[#343E37] pl-[16px] text-[24px]  leading-[36px]" placeholder="Add post title" />
              <div ref={editorRef} className="grow borde relative">
                <TextEditor handleWordCount={handleWordCount} embedModal={embedModal} imageString={imageString} handleImageUpload={handleImageUpload} layoutRef={layoutRef} handleFocus={handleFocus} isFocused={isFocused} isOpen={embedModal.isOpen}/>
              </div>
              {/* <div className="h-[27px] border-t border-[#E7F1E9] text-[10px] pr-[14px] bg-[#FFFFFF] flex items-center justify-end text-right text-[#343E37]">
                {`0/1000 words`}
              </div> */}
            </div>
          </div>
        )
      }}
    </AppContext.Consumer>
  )
}
