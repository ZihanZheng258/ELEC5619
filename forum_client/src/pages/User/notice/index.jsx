import React, { useState, useEffect } from 'react'
import { Avatar, List, Badge } from 'antd';

import api from '../../../api/index'
const Notice =  () => {


    const [notice, setnotice] = useState({})
    useEffect(() => {

   
    get_notice()

  
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
    const sethaveRead=async (id)=>{
      
        const   {data}= await    api.sethaveRead(id)

       if(data.flag){

        get_notice()
       }

    }
    const get_notice=async()=>{

        const   res= await    api.getSelf()

        
        const   u_id=res.data.data.user.id

        const   {data}= await    api.getReceiverNotice(u_id)

        console.log(data);
        setnotice(data.data)
    
        console.log(notice,123);
    }
    return (
        <div className='notice_container' style={{ padding: '20px' }}>
            <List
                itemLayout="horizontal"
                dataSource={notice.notice}
                renderItem={(item) => (
                    <List.Item  onClick={()=>sethaveRead(item.id)}>
                        <Badge  count={item.haveRead===1?0:1} >
                            <Avatar shape="square" size="large" src={item.avatar} />
                        </Badge>
                        <List.Item.Meta style={{ marginLeft: '20px' }}
                            title={item.jsonReceiver.nickName}
                            description={item.content}
                        />
                    </List.Item>
                )}
            />
        </div>
    )
}
export default Notice
