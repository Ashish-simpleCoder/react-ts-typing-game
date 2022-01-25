import "./styles/index.css"
import { memo, useState } from "react";
import Paragraph from "./components/Paragraph"
import WORD_CLOUD from './utils/word_cloud'
import Header from "./components/Header";
import Input from "./components/Input";

const App = memo(()=>{
    const [cloud_index, setClouIndex] = useState(WORD_CLOUD[Math.floor((Math.random()*WORD_CLOUD.length))].split(" "))

    const [state,setState] = useState('')
    const [active_word_index, setActiveWordIndex] = useState(0)

    const handleChange = (value:string) =>{
        setState(value)
    }



    return(
        <>
            <Header heading='React Typing Speed Game'/>
            <Paragraph
                text={cloud_index}
                active_word_index={active_word_index}
            />
            {/* <Input state={state} handleChange={handleChange}/> */}
        </>
    )
})
export default App