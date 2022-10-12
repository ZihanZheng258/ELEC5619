import React, { useState, useEffect } from 'react'
import { Avatar, List, Badge } from 'antd';
const Notice = () => {

    useEffect(() => {

    }, [])

    const data = [
        {
            title: 'Ant Design Title 1',
        },
        {
            title: 'Ant Design Title 2',
        },
        {
            title: 'Ant Design Title 3',
        },
        {
            title: 'Ant Design Title 4',
        },
    ];

    return (
        <div className='notice_container' style={{ padding: '20px' }}>
            <List
                itemLayout="horizontal"
                dataSource={data}
                renderItem={(item) => (
                    <List.Item>
                        <Badge count={5} >
                            <Avatar shape="square" size="large" />
                        </Badge>
                        <List.Item.Meta style={{ marginLeft: '20px' }}
                            title={<a href="https://ant.design">{item.title}</a>}
                            description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                        />
                    </List.Item>
                )}
            />
        </div>
    )
}
export default Notice
