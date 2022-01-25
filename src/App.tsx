import "./styles/index.css"
import { memo, useEffect, useState } from "react";
import Paragraph from "./components/Paragraph"
import WORD_CLOUD from './utils/word_cloud'
import Header from "./components/Header";
import Input from "./components/Input";

const App = memo(()=>{
    const [cloud_index, setClouIndex] = useState(WORD_CLOUD[Math.floor((Math.random()*WORD_CLOUD.length))].split(" "))

    const [state,setState] = useState('')
    const [active_word_index, setActiveWordIndex] = useState(0)
    const [typed_words_arr, setTypedWordsArr] = useState<boolean[]>([])
    const [total_right_words,setTotalRightWords] = useState(0)
    const [total_time, setTotalTime] = useState(0)

    let timer:NodeJS.Timer
    const startTimer = () => timer = setInterval(()=>setTotalTime(v=>v+1),1000)

    useEffect(()=>{
        if(active_word_index > cloud_index.length-1){
            clearInterval(timer)
            setTimeout(()=>alert('your typing speed is '+Math.round((total_right_words*60)/total_time)+' wpm'),1000)
            setTypedWordsArr([])
            setActiveWordIndex(0)
            setTotalRightWords(0)
            setState('')
        }
    },[active_word_index])

    useEffect(()=>{
        total_time===1 && startTimer()
    },[total_time])

    const handleChange = (value:string) =>{
        if(value.endsWith(' ')){
            if(total_time === 0) setTotalTime(1);
            (value.trim() === cloud_index[active_word_index]) && setTotalRightWords(index=>index+1)
            setActiveWordIndex(index=>index+1)
            setState('')
            setTypedWordsArr(words=>{
                const new_arr = [...words]
                new_arr[active_word_index] = value.trim() === cloud_index[active_word_index]
                return new_arr
            })
        }else{
            setState(value)
        }
    }



    return(
        <>
            <Header heading='React Typing Speed Game'/>
            <Paragraph
                text={cloud_index}
                active_word_index={active_word_index}
                typed_words_arr={typed_words_arr}
            />
            <Input state={state} handleChange={handleChange}/>
        </>
    )
})
export default App