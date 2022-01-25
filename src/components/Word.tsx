import { memo } from "react";

const Word = ({word, active, correct}:{
    word:string,
    active?:boolean,
    correct?:boolean
})=>{
    if(correct === true){
        return <span className='right'>{word} </span>
    }
    if(correct === false){
        return <span className='wrong'>{word} </span>
    }
    if(active){
        return <span className="active">{word} </span>
    }
    return <span>{word} </span>
}
export default Word