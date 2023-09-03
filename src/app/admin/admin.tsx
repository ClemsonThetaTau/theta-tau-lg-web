import { useState } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';
import { Layout, Menu, Breadcrumb } from 'antd';

const { Header, Content, Footer } = Layout;

export default function Admin() {
  const [session, loading] = useSession();
  const router = useRouter();
  const [selectedMenu, setSelectedMenu] = useState('dashboard');

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!session) {
    router.push('/login');
    return null;
  }

  const handleMenuClick = (e) => {
    setSelectedMenu(e.key);
  };

  return (
    <Layout className="min-h-screen">
      <Header className="bg-white shadow-sm">
        <div className="flex items-center justify-between">
          <div className="text-lg font-bold">Admin Panel</div>
          <div>{session.user.email}</div>
        </div>
      </Header>
      <Content className="p-4">
        <Breadcrumb className="mb-4">
          <Breadcrumb.Item>Admin</Breadcrumb.Item>
          <Breadcrumb.Item>{selectedMenu}</Breadcrumb.Item>
        </Breadcrumb>
        <div className="flex">
          <Menu
            mode="inline"
            selectedKeys={[selectedMenu]}
            onClick={handleMenuClick}
            className="mr-4"
          >
            <Menu.Item key="dashboard">Dashboard</Menu.Item>
            <Menu.Item key="users">Users</Menu.Item>
            <Menu.Item key="settings">Settings</Menu.Item>
          </Menu>
          <div className="flex-1">
            {selectedMenu === 'dashboard' && <Dashboard />}
            {selectedMenu === 'users' && <Users />}
            {selectedMenu === 'settings' && <Settings />}
          </div>
        </div>
      </Content>
      <Footer className="text-center">Admin Panel ©2021 Created by You</Footer>
    </Layout>
  );
}

function Dashboard() {
  return <div>Dashboard</div>;
}

function Users() {
  return <div>Users</div>;
}

function Settings() {
  return <div>Settings</div>;
}