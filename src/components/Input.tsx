import { memo } from "react"

const Input = memo(({state,handleChange}:{
    state:string,
    handleChange:(value:string)=>void
})=>{
    return(
        <input type="text" value={state} onChange={(e)=>handleChange(e.target.value)}/>
    )
})
export default Input