import { ReactNode } from "react";

type EditorButtonProps = {
    children: ReactNode;
    isActive: boolean | undefined;
    onClick:()=>void;    
}

type EditorButtonUI = {
    task: string;
    icon: ReactNode;
}


export type {EditorButtonProps, EditorButtonUI}