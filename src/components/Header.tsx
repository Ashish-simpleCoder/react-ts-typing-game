import {memo} from 'react'

const Header = memo(({heading}:{heading:string})=>{
    return(
        <header>
            <h1>{heading}</h1>
        </header>
    )
})
export default Header