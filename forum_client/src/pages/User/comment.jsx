import React, { useState, useEffect } from 'react'
import { Avatar, Comment } from 'antd'

const ExampleComment = ({ children }) => (
    <Comment
        actions={[<span key='comment-nested-reply-to'>Reply to</span>]}
        author={<a>Han Solo</a>}
        avatar={<Avatar src='https://joeschmoe.io/api/v1/random' alt='Han Solo' />}
        content={
            <p>
                We supply a series of design principles, practical patterns and high quality design resources (Sketch
                and Axure).
            </p>
        }
    >
        {children}
    </Comment>
)

const CommentModal = () => {
    useEffect(() => { }, [])

    return (
        <div className='comments_container' style={{ padding: '20px' }}>
            <ExampleComment>
                <ExampleComment>
                    <ExampleComment />
                    <ExampleComment />
                    <ExampleComment />
                    <ExampleComment />
                    <ExampleComment />
                    <ExampleComment />
                </ExampleComment>
            </ExampleComment>
        </div>
    )
}
export default CommentModal
