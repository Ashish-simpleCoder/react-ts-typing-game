import { memo } from "react";
import Word from "./Word";

const Paragraph = memo(({text}:{text:string[]})=>{
    return(
        <p>
        {
            text.map((word,index)=><Word key={index} word={word}/>)
        }
        </p>
    )
})
export default Paragraph