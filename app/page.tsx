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
      {({ handleFocus, isFocused, editorRef, embedModal, handleImageUpload, imageString, layoutRef, handleWordCount }) => {
        return (
          <div className="flex items-center h-full justify-center relative">
            <div className={`border border-[#E7F1E9] bg-[#FAFAFA] w-[90%] md:w-[662px] md:h-[650px] flex-col flex h-[500px] ${embedModal.isOpen ? "hidden" : ""}`}>
              <div className="border-b border-[#E7F1E9] h-[30px]"></div>
              <input className="borde outline-none bg-[#FAFAFA] text-[#343E37] pl-[16px] text-[24px]  leading-[36px]" placeholder="Add post title" />
              <div ref={editorRef} className="grow borde relative">
                <TextEditor handleWordCount={handleWordCount} embedModal={embedModal} imageString={imageString} handleImageUpload={handleImageUpload} layoutRef={layoutRef} handleFocus={handleFocus} isFocused={isFocused} isOpen={embedModal.isOpen} />
              </div>
            </div>
          </div>
        )
      }}
    </AppContext.Consumer>
  )
}
