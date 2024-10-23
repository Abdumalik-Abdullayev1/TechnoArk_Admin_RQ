import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, Modal, theme } from 'antd';
import { useEffect, useState } from 'react'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { admin } from '../../router/routes'

const { Header, Sider, Content } = Layout;

const Index = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState("")
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { pathname } = useLocation()
  const navigate = useNavigate();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    let index = admin.findIndex((item) => item.path === pathname)
    setSelectedKey(index.toString())
  }, [pathname])

  const handleClick = () => {
    setIsModalVisible(true); // Modalni ko'rsatish
  };

  const handleOk = () => {
    localStorage.clear();
    setIsModalVisible(false); // Modalni yopish
    navigate('/');
  };

  const handleCancel = () => {
    setIsModalVisible(false); // Modalni yopish
  };

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <div className="flex">
          <h1 className="w-2/3 text-white p-6 bg-dark-blue font-bold text-lg">TechnoArt</h1>
        </div>
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={[selectedKey]}
            items={admin.map((item, index) => ({
              key: index.toString(),
              icon: item.icon,
              label: <NavLink to={item.path} className='text-white'>{item.content}</NavLink>
            }))}
          />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
          className="flex justify-between px-10"
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
          <button className="flex gap-3 items-center mx-6 text-base" onClick={handleClick}>
            <LogoutOutlined/>
            <h3>Logout</h3>
          </button>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: '85vh',
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>

      {/* Modal */}
      <Modal
        title="Logout Confirmation"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="OK"
        cancelText="Cancel"
      >
        <p>Are you sure you want to logout?</p>
      </Modal>
    </Layout>
  );
};

export default Index;
