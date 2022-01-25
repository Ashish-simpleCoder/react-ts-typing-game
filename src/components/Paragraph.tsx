import { memo } from "react";
import Word from "./Word";

const Paragraph = memo(({text, active_word_index, typed_words_arr}:{
    text:string[],
    active_word_index:number,
    typed_words_arr:boolean[]
})=>{
    return(
        <p>
        {
            text.map((word,index)=><Word key={index} word={word} active={index === active_word_index} correct={typed_words_arr[index]}/>)
        }
        </p>
    )
})
export default Paragraph