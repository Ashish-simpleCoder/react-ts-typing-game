import "./styles/index.css"
import { memo, useState } from "react";
import Paragraph from "./components/Paragraph"
import WORD_CLOUD from './utils/word_cloud'
import Header from "./components/Header";
import Input from "./components/Input";

const App = memo(()=>{
    const [cloud_index, setClouIndex] = useState(Math.floor((Math.random()*WORD_CLOUD.length)))

    const [state,setState] = useState('')

    const handleChange = (value:string) =>{
        setState(value)
    }



    return(
        <>
            <Header heading='React Typing Speed Game'/>
            <Paragraph text={WORD_CLOUD[cloud_index].split(" ")}/>
            <Input state={state} handleChange={handleChange}/>
        </>
    )
})
export default App