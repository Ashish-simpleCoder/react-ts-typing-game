import { memo } from "react";

const Word = memo(({word}:{word:string})=>{
    return(
        <span>{word} </span>
    )
})
export default Word