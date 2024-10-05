import { ReactNode } from "react"

type EmbedTab = {
    icon: ReactNode;
    title: string;
    formats: string[];
    type: string;
}

export type {EmbedTab}