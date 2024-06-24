import ModalComponent from '../components/ModalComponent';
import React, { useEffect, useState } from 'react';
import { Table, Input, Upload, message } from 'antd';
import { IconButton } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import {updateUser} from '../api/axios';
import { useAuth } from "../context/AuthContext";
export default function UserActionComponent({data,setData,record,deleteUser}) {
    const { user } = useAuth();
    const getBase64 = (file) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = (error) => reject(error);
        });
      
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [avatarFile, setAvatarFile] = useState(null);
    const [previewImage, setPreviewImage] = useState('');
    const handleOk = async () => {
        if (editingUser) {
            try {
                const formData = new FormData();
                formData.append('id', editingUser.id);
                formData.append('name', editingUser.name);
                formData.append('email', editingUser.email);
                formData.append('role', editingUser.role);
                console.log(avatarFile);
                if (avatarFile) {
                    formData.append('file', avatarFile);
                }

               await updateUser(formData);
               const userData = {id: editingUser.id, name: editingUser.name, email: editingUser.email, role: editingUser.role, avatar: previewImage? previewImage : editingUser.avatar};
                const index = data.findIndex((user) => user.id === editingUser.id);
                data[index] = userData;
                setData([...data]);
               setEditingUser(userData);
                message.success('User updated successfully');
                setIsModalOpen(false);
            } catch (error) {
                message.error('Update failed');
            }
        }
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditingUser({ ...editingUser, [name]: value });
    };

    
    const handleAvatarChange = async ({ file }) => {
        if(file.status === 'removed') {
          console.log('removed');
            setPreviewImage(null);
            setAvatarFile(null);
            return
        }
        const preview = await getBase64(file);
        setPreviewImage(preview);
        setAvatarFile(file);

    };
    return (
        <span>
             <ModalComponent
                isModalOpen={isModalOpen}
                headerTitle="User Information"
                setIsModalOpen={setIsModalOpen}
                handleOption={handleOk}
                handleCancel={() => setIsModalOpen(false)}
            >
                <div className='content'>
                    <div>User Name</div>
                    <Input
                        name="name"
                        placeholder='User Name'
                        value={editingUser?.name}
                        onChange={handleInputChange}
                    />
                    <div>Email</div>
                    <Input
                        name="email"
                        placeholder='Email'
                        value={editingUser?.email}
                        onChange={handleInputChange}
                    />
                    <div>Role</div>
                    <Input
                        name="role"
                        placeholder='Role'
                        value={editingUser?.role}
                        onChange={handleInputChange}
                    />
                    <div>Avatar</div>
                    <Upload
                        listType="picture-card"
                        maxCount={1}
                        showUploadList={true}
                        beforeUpload={() => false}
                        onChange={async ({file})=>{await handleAvatarChange({file})}}
                        
                    >
                        {previewImage ? (
                            <img src={previewImage
                            } alt="avatar" style={{ width: '100%' }} />
                        ) : (
                            <div>
                                <div style={{ marginTop: 8 }}>Upload</div>
                            </div>
                        )}
                    </Upload>
                </div>
            </ModalComponent>
        <IconButton onClick={() => {setEditingUser(record); setIsModalOpen(true); }}>
            <EditOutlinedIcon style={{ fontSize: '30px', marginRight: 10, color: 'yellow' }} />
        </IconButton>
       {user.email!=record.email ?<IconButton onClick={async ()=>{await deleteUser(record?.id)}}>
            <DeleteOutlineOutlinedIcon style={{ fontSize: '30px', color: 'red' }} />
        </IconButton>:''} 
    </span>
    )

} 