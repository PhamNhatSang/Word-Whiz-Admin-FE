import React, { useEffect, useState } from 'react';
import { Table} from 'antd';
import { Avatar } from 'antd';
import { getUsers,deleteUser } from '../api/axios';

import UserActionComponent from '../components/UserActionComponent';


export default function UserManagementPage() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 10,
        },
    });
    const deleteUserAdmin = async (id) => {
        await deleteUser(id);
    
        if (data.length === 1 && tableParams.pagination.current > 1) {
          setTableParams((prev) => ({
            ...prev,
            pagination: {
              ...prev.pagination,
              current: prev.pagination.current - 1,
            },
          }));
        } else {
          fetchData();
        }
      };
   
      const fetchData = async () => {
        setLoading(true);
        const response = await getUsers(tableParams);
        setData(response.usersDataReturn);
        setTableParams({
            ...tableParams,
            pagination: {
                ...tableParams.pagination,
                total: response.total,
            },
        });
        setLoading(false);
    };


   

    const columns = [
        { title: 'ID', dataIndex: 'id', width: '10%' },
        { title: 'Name', dataIndex: 'name', width: '20%' },
        { title: 'Email', dataIndex: 'email', width: '20%' },
        { title: 'Avatar', dataIndex: 'avatar', render: (avatar) => <Avatar style={{ width: 40, height: 40 }} src={avatar} /> },
        { title: 'Role', dataIndex: 'role' },
        {
            title: 'Action',
            dataIndex: 'action',
            render: (text, record) => (
               <UserActionComponent data={data} setData={setData} record={record} deleteUser={deleteUserAdmin}></UserActionComponent>
            ),
        },
    ];

   
    useEffect(() => {
       
        fetchData();
    }, [
        tableParams.pagination?.current,
        tableParams.pagination?.pageSize,
    ]);

    const handleTableChange = (pagination) => {
        setTableParams({
            pagination,
        });

        if (pagination.pageSize !== tableParams.pagination?.pageSize) {
            setData([]);
        }
    };

   

  

    return (
        <div>
           
            <Table
                columns={columns}
                rowKey={(record) => record.id}
                dataSource={data}
                pagination={tableParams.pagination}
                loading={loading}
                onChange={handleTableChange}
            />
        </div>
    );
}
