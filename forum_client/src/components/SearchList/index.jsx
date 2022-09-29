import React from "react";
import './index.less'

const SearchList = () =>{
    const arr = [1,2,3,4];
    return(
        <div className="searchList">
            <div className="searchResults">
                <ul>
                    {arr.map((index)=>{
                        return <li key={index.toString()}>
                            <h5 className="title">Search title</h5>
                            <div className="content">
                                "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis
                                voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
                                "body": "est rerum tempore vitae\nsequi sint n...
                            </div>
                            <div className="date">
                                Author Category date
                            </div>
                        </li>

                    })
                    }

                </ul>
            </div>
        </div>
    )
}

export default SearchList