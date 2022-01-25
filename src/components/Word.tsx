import { memo } from "react";

const Word = ({word, active, correct}:{
    word:string,
    active:boolean,
    correct?:boolean
})=>{

    if(active){
        return <span className="active">{word} </span>
    }
    return <span>{word} </span>
}
export default Word