import { memo } from "react"

const Input = memo(({state,handleChange,placeholder}:{
    state:string,
    handleChange:(value:string)=>void,
    placeholder?:string
})=>{
    return(
        <input type="text" value={state} onChange={(e)=>handleChange(e.target.value)} placeholder={placeholder}/>
    )
})
export default Input