import "./styles/index.css"
import { memo, useState } from "react";
import Paragraph from "./components/Paragraph"
import WORD_CLOUD from './utils/word_cloud'
import Header from "./components/Header";

const App = memo(()=>{
    const [cloud_index, setClouIndex] = useState(Math.floor((Math.random()*WORD_CLOUD.length)))
    return(
        <>
            <Header heading='React Typing Speed Game'/>
            <Paragraph text={WORD_CLOUD[cloud_index].split(" ")}/>
        </>
    )
})
export default App