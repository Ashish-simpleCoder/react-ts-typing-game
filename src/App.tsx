import "./styles/index.css"
import { memo, useEffect, useState } from "react";
import Paragraph from "./components/Paragraph"
import WORD_CLOUD from './utils/word_cloud'
import Header from "./components/Header";
import Input from "./components/Input";

const randomNumber =  () => Math.floor((Math.random()*WORD_CLOUD.length))
const App = memo(()=>{
    const [cloud_index, setCloudIndex] = useState(()=>WORD_CLOUD[randomNumber()].split(" "))

    const [state,setState] = useState('')
    const [active_word_index, setActiveWordIndex] = useState(0)
    const [typed_words_arr, setTypedWordsArr] = useState<boolean[]>([])
    const [total_right_words,setTotalRightWords] = useState(0)
    const [total_time, setTotalTime] = useState(0)
    const [timer, setTimer] = useState<NodeJS.Timeout>()

    const startTimer = () => setTimer(setInterval(()=>setTotalTime(v=>v+1),1000))

    useEffect(()=>{
        if(active_word_index > cloud_index.length-1){
            setTotalTime(0)
            setTimeout(()=>alert('your typing speed is '+Math.round((total_right_words*60)/total_time)+' wpm'),1000)
            if(timer){
                clearInterval(timer)
            }
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
        if(total_time === 0) setTotalTime(1);
        if(value.endsWith(' ')){
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
            <main>
                <div>
                    <h2>Type correctly the words, which are present below</h2>
                    <span>Timer : {total_time}</span>
                </div>
                <Paragraph
                    text={cloud_index}
                    active_word_index={active_word_index}
                    typed_words_arr={typed_words_arr}
                />
                <Input state={state} handleChange={handleChange} placeholder="type here to begin the game"/>
                <button onClick={()=>setCloudIndex(WORD_CLOUD[randomNumber()].split(" "))}>change the content</button>
            </main>

        </>
    )
})
export default App