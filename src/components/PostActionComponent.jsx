import ModalComponent from '../components/ModalComponent';
import React, {  useState } from 'react';
import { IconButton } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';

import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { Image } from 'antd';
import {deletePost} from '../api/axios';
export default function PostActionComponent({record,deletePost}) {
 
      
    const [isModalOpen, setIsModalOpen] = useState(false);
 
    const handleOk = async () => {
       setIsModalOpen(false);
    };


    
   
    return (
        <span>
             <ModalComponent
                isModalOpen={isModalOpen}
                headerTitle="Post Information"
                setIsModalOpen={setIsModalOpen}
                handleOption={handleOk}
                handleCancel={() => setIsModalOpen(false)}
            >
                <div className='content'>
                    <h1 className=' font-bold text-2xl'>Content:</h1>
                    <div  className=' text-xl'>{record?.content}</div>
                    <h2 className=' font-bold text-2xl'>Author:</h2>
                    <div  className=' text-xl'>{record?.ownerName}</div>
                    <h3 className=' font-bold text-2xl'>Author Email:</h3>
                    <div className=' text-xl' >{record?.ownerEmail}</div>
                    <h4 className=' font-bold text-2xl'>Image:</h4>
                    <Image width={200} src={record?.image}></Image>
                </div>
            </ModalComponent>
        <IconButton onClick={() => { setIsModalOpen(true); }}>
            <RemoveRedEyeOutlinedIcon style={{ fontSize: '30px', marginRight: 10, color: 'yellow' }} />
        </IconButton>
        <IconButton onClick={async ()=>{await deletePost(record?.id)}}>
            <DeleteOutlineOutlinedIcon style={{ fontSize: '30px', color: 'red' }} />
        </IconButton>
    </span>
    )

} 