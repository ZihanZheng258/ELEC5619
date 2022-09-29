import React, {useEffect} from "react";
import './index.less'

const Comment =() =>{
    // fetch the content
    useEffect(()=>{
        fetch('https://jsonplaceholder.typicode.com/posts?_limit=10',
            {method:"GET"})
            .then(response => response.json())
            .then(data => console.log(data));
    })

    return(
        <>


        </>
    )
}

export default Comment