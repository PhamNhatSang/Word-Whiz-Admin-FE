import React from 'react';
import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  TeamOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  BookOutlined
} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import { useNavigate } from 'react-router-dom';


export default function DefaultLayout({ children }) {
  const { Header, Content, Footer, Sider } = Layout;
const nagative = useNavigate();
const items = [
  UserOutlined,
  BookOutlined,
].map((icon, index) => ({
  key: String(index + 1),
  icon: React.createElement(icon),
  label: icon === UserOutlined ? 'User Management' : icon === BookOutlined ? 'Post Mgitanagement' : `Menu ${index + 1}`,
  onClick: ()=>{
    if(icon === UserOutlined){
      nagative('/user-management');
    }
    if(icon === BookOutlined){
      nagative('/post-management');
    }
  }
}));


  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout hasSider>
      <Sider
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div className="demo-logo-vertical" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']} items={items} />
      </Sider>
      <Layout
        style={{
          marginLeft: 200,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        />
        <Content
          style={{
            margin: '24px 16px 0',
            overflow: 'initial',
            background: colorBgContainer,
            flex: 1,
          }}
        >
          <div
            style={{
              padding: 24,
              textAlign: 'center',
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {children}
          </div>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          Admin Design ©{new Date().getFullYear()} Created by WordWhiz Admin
        </Footer>
      </Layout>
    </Layout>
  );
}
