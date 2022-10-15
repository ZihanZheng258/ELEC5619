import React, { useState, useEffect } from 'react'
import { Avatar, Comment,Form,Tooltip } from 'antd'
import api from "../../../api"
import moment  from 'moment'


import svg from '../assets/like-red.svg'
const ExampleComment = ({ item }) => (



    <Comment
        actions={[
        
        
        <Tooltip key="comment-basic-like" title="Like">
        <span >
        <img
                                src= {svg}
                                alt=""
                                width={25}
height={25}                     
                            />
          <span className="comment-action">{item.likeNumber}</span>
        </span>
      </Tooltip>,


  

     
      <span key="comment-basic-reply-to">{  moment(item.createDate).format('YYYY-MM-DD HH:mm:ss')  }</span>]}
        content={
            <p>
                {item.content}
              
            </p>


        }
    >
   
    </Comment>
)




class CommentModal  extends React.Component {

            state={comments:[]}

            


        async    componentWillMount(){
        const   res= await    api.getSelf()

        
        const   u_id=res.data.data.user.id
                    
        const {data:{data:{comments}}} = await  api.getUserComments(u_id)
        const {data:{data:{comments:NoteComment}}} = await  api.getNoteComment(u_id)

    
            this.setState({

                comments:[...comments,...NoteComment]
            })


     
        }

            render(){
    
                const op=this.state.comments.map(item=>{


                    return  <ExampleComment item={item} key={item.id}> </ExampleComment>
                })
                return (

        
                    <div className='comments_container' style={{ padding: '20px' }}>
                        {/* <ExampleComment>
                            <ExampleComment>
                                <ExampleComment  />
                                <ExampleComment />
                                <ExampleComment />
                                <ExampleComment />
                                <ExampleComment />
                                <ExampleComment />
                            </ExampleComment>
                        </ExampleComment> */}
            
                  
                    
                      {op}
            
            
                    </div>
                )

            }
    
}
export default CommentModal
