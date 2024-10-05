import * as ButtonTypes from "@/lib/sharedTypes"
import { HiMiniLink } from "react-icons/hi2";
import { FaImage } from "react-icons/fa6";
import { BsListOl } from "react-icons/bs";
import { FiAlignLeft, FiAlignRight, FiAlignJustify } from "react-icons/fi";
import { IoVideocam } from "react-icons/io5";
import { MdFormatBold, MdOutlineFormatItalic, MdFormatListBulleted } from "react-icons/md";
import * as SharedTypes from "@/lib/sharedTypes"
import { PiCirclesThreeFill } from "react-icons/pi";


const buttons: ButtonTypes.EditorButtonUI[][] = [
    [
        {
            task: "link",
            icon: <HiMiniLink size={20}/>
        },
        {
            task: "image",
            icon: <FaImage size={20}/>
        }
    ],
    [
        {
            task: "left",
            icon: <FiAlignLeft size={20}/>
        },
        {
            task: "right",
            icon: <FiAlignRight size={20}/>
        },
        {
            task: "center",
            icon: <FiAlignJustify size={20}/>
        }
    ],
    [
        {
            task: "bold",
            icon: <MdFormatBold size={20}/>
        },
        {
            task: "italic",
            icon: <MdOutlineFormatItalic size={20}/>
        }
    ],
    [
        {
            task: "bulletList",
            icon: <MdFormatListBulleted size={20}/>
        },
        {
            task: "orderedList",
            icon: <BsListOl size={20}/>
        }
    ],
]

const embeds:SharedTypes.EmbedTab[] = [
    {
        title: "Picture",
        icon: <FaImage size={13} />,
        formats: ["jpeg", "png"],
        type: "image"

    },
    {
        title: "Video",
        icon: <IoVideocam size={13} />,
        formats: ["Embed a Youtube Video"],
        type: "video"

    },
    {
        title: "Social",
        icon: <FaImage size={13} />,
        formats: ["Embed a facebook link"],
        type: "social"

    }
]


export {buttons, embeds}