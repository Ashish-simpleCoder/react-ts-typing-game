import { memo } from "react";
import Word from "./Word";

const Paragraph = memo(({text, active_word_index}:{
    text:string[],
    active_word_index:number
})=>{
    return(
        <p>
        {
            text.map((word,index)=><Word key={index} word={word} active={index === active_word_index}/>)
        }
        </p>
    )
})
export default Paragraph