import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { getPosts, deletePost } from '../api/axios';
import {Image} from 'antd';
import PostActionComponent from '../components/PostActionComponent';
export default  function PostManagementPage() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 10,
        },
    });
    const deletePostAdmin = async (id) => {
        await deletePost(id);
    
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
        const response = await getPosts(tableParams);
        setData(response.postsDataReturn);
        setTableParams({
            ...tableParams,
            pagination: {
                ...tableParams.pagination,
                total: response.total,
            },
        });
        setLoading(false);
    };
    
    useEffect(() => {
       
        fetchData();
    }, [
        tableParams.pagination?.current,
        tableParams.pagination?.pageSize,
    ]);
    const columns = [
        { title: 'ID', dataIndex: 'id', width: '10%' },
        { title: 'Content', dataIndex: 'content', width: '20%' },
        { title: 'Author', dataIndex: 'ownerName' },
        { title: 'Author Email', dataIndex: 'ownerEmail' },
        {title:'Image' ,dataIndex:'image',render:(image) => <Image width={100} src={image}></Image>},
        {
            title: 'Action',
            dataIndex: 'action',
            render: (text, record) => (
                <PostActionComponent record={record} deletePost={deletePostAdmin} />
            ),
        },
       
    ];
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