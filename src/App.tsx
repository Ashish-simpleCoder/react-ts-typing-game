import { memo, useState } from "react";
import Paragraph from "./components/Paragraph"
import WORD_CLOUD from './utils/word_cloud'

const App = memo(()=>{
    const [cloud_index, setClouIndex] = useState(Math.floor((Math.random()*WORD_CLOUD.length)))
    return(
        <>
            <Paragraph text={WORD_CLOUD[cloud_index].split(" ")}/>
        </>
    )
})
export default App