import React, { useState } from 'react';
import { Button, Modal } from 'antd';
export default function ModalComponent({children ,handleOption,headerTitle,isModalOpen,setIsModalOpen}) {

   
  
  
    const handleCancel = () => {
      setIsModalOpen(false);
    };
  
    return (
      <>
       
        <Modal title={headerTitle} open={isModalOpen} onOk={ async () =>{await handleOption()}} onCancel={handleCancel}>
            {children}
        </Modal>
        </>
    );
    }