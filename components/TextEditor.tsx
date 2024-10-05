"use client"
import { EditorProvider, EditorContent, useEditor, Editor } from '@tiptap/react'
import Placeholder from '@tiptap/extension-placeholder'
import StarterKit from '@tiptap/starter-kit'
import { Fragment, RefObject, useEffect, useRef, useState } from 'react'
import FormatBar from './FormatBar'
import TextAlign from "@tiptap/extension-text-align"
import { FaPlus } from "react-icons/fa6";
import Image from '@tiptap/extension-image'
import EmbedContainer from './Embedcontainer'
import { createPortal } from 'react-dom'
import ImageResize from 'tiptap-extension-resize-image';
import Youtube from '@tiptap/extension-youtube'
import EmbedTab from './EmbedTabs'
import * as constantVariables from "@/lib/constantVariables"
import AppContext from './ContextProvider'

type TextEditorProps = {
    handleFocus: () => void;
    isFocused: boolean;
    isOpen: boolean;
    layoutRef: React.RefObject<HTMLDivElement>;
    embedModal: { isOpen: boolean, type: string };
    imageString: string;
    handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const extensions = [
    StarterKit,
    Placeholder.configure({
        placeholder: "Add Content",
        emptyEditorClass: 'is-editor-empty',
        // showOnlyWhenEditable: false,
    }),
    TextAlign.configure({
        types: ['heading', 'paragraph'],
    }),
    Image.configure({
        allowBase64: true,
        inline: true,
        HTMLAttributes: {
            class: 'h-[250px] w-[300px]',
        }
    }),
    Youtube.configure({
        controls: false,
        nocookie: true,
    }),
    // ImageResize
]

export default function TextEditor({ handleFocus, isFocused, isOpen, layoutRef, embedModal, handleImageUpload, imageString }: TextEditorProps) {
    const [editorInitialized, setEditorInitialized] = useState(false)
    const [editorHeight, setEditorHeight] = useState(100)
    const [height, setHeight] = useState(323)
    const [width, setWidth] = useState(608)
    // const [embedTabList, setEmbedTabList] = useState<boolean>(false)
    const editorRef = useRef<HTMLDivElement>(null);

    const editor = useEditor({
        extensions,
        editorProps: {
            attributes: {
                class: ' focus:outline-none ml-[16px] pl-[5px] min-h-[100px]',
            }

        },
        onUpdate({ editor }) {
            handleEditorUpdate(editor)
            handleFocus()
        }
    })



    const embedVideo = (url: string) => {
        if (url) {
            const docContent = editor?.state.doc
            const lastNode = docContent?.lastChild
            editor?.commands.setYoutubeVideo({
                src: url,
                width: Math.max(320, parseInt(width.toString(), 10)) || 608,
                height: Math.max(180, parseInt(height.toString(), 10)) || 323,
            })
        }
    }

    function embedImage() {
        editor?.chain().focus().setImage({ src: imageString }).run()
        editor?.chain().focus().setTextSelection(editor.state.doc.content.size).run()
    }

    function handleEditorUpdate(editor: Editor) {
        const docContent = editor.state.doc;
        const lastNode = docContent.lastChild;
        // debugger
        
        if (lastNode?.type.name === 'image' || lastNode?.type.name === 'youtube') {
            editor.commands.focus();
            editor.commands.setTextSelection(docContent.content.size)
            setEditorHeight((prevHeight) => docContent.content.size + 100)
        }
    }


    useEffect(() => {
        if (editor && typeof window !== 'undefined') {
            setEditorInitialized(true);
        }
    }, [editor])

    return (
        <AppContext.Consumer>
            {({ embedTabList, embedButtonRef, handleEmbedTabList, handleEmbedModal }) => {
                return (
                    <>
                        {isOpen && layoutRef.current && createPortal(
                            <EmbedContainer embedVideo={embedVideo} embedModal={embedModal} handleImageUpload={handleImageUpload} imageString={imageString} embedImage={embedImage} />,
                            layoutRef.current as HTMLDivElement
                        )}
                        <div className={`border h-full flex flex-col p-0 `}>
                            <div className={`h-[45px] borde ml-[16px] flex items-center`}>
                                <FormatBar editor={editor} isFocused={isFocused} />
                            </div>
                            <div ref={editorRef}
                                style={{ minHeight: `${editorHeight}px`, overflow: 'auto' }}
                                className=' borde'
                            >
                                {editorInitialized && <EditorContent
                                    editor={editor}
                                />}
                            </div>
                            <button ref={embedButtonRef} onClick={() => { handleEmbedTabList() }} className={`h-[16px] ml-[16px] w-[16px] rounded-[50%] ${isFocused ? "flex" : "hidden"} justify-center items-center bg-[#E7F1E9]`}>
                                <FaPlus size={7} />
                            </button>
                            <ul className={`${embedTabList ? "flex" : "hidden"} flex-col bg-[#FAFAFA] w-[277px] ml-[16px] mt-[4px] rounded-[10px] borde shadow-md py-[3px]`}>
                                <h2 className='ml-[10px] text-[10px] font-[600] text-[#333333]'>EMBEDS</h2>
                                <div className='w-full mt-[14px] flex flex-col'>
                                    {constantVariables.embeds.map((embed, index) => {
                                        return (
                                            <Fragment key={index}>
                                                <EmbedTab
                                                    title={embed.title}
                                                    formats={embed.formats}
                                                    icon={embed.icon}
                                                    type={embed.type}
                                                    onClick={handleEmbedModal}
                                                />
                                            </Fragment>
                                        )
                                    })}
                                </div>

                            </ul>
                        </div>
                    </>
                )
            }}
        </AppContext.Consumer>
    )
}