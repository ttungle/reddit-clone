'use client';

import { Layout, Menu } from 'antd';
import { ReactNode } from 'react';
import { AiOutlineStock } from 'react-icons/ai';
import { IoTrendingUp } from 'react-icons/io5';
import { TbHome } from 'react-icons/tb';
import { CreatePost } from '../create-post';
import { RecentPost } from '../recent-post';

const { Content, Sider } = Layout;

export interface AppContentProps {
  children: ReactNode;
}

export function AppContent({ children }: AppContentProps) {
  const items = [
    {
      key: 'home',
      icon: <TbHome />,
      label: 'Home',
    },
    {
      key: 'trend',
      icon: <IoTrendingUp />,
      label: 'Trend',
    },
    {
      key: 'business',
      icon: <AiOutlineStock />,
      label: 'Business',
      children: [
        {
          key: 'business-1',
          label: 'Option 1',
        },
        {
          key: 'business-2',
          label: 'Option 2',
        },
      ],
    },
  ];

  return (
    <Content className='lg:container lg:mx-auto lg:px-36 xs:px-0 mt-28'>
      <Layout>
        <Sider width={200} className='xs:hidden xl:block'>
          <Menu
            mode='inline'
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%' }}
            items={items}
          />
        </Sider>

        <Content className='px-6 min-h-[280px]'>
          <div className='site-layout-content'>{children}</div>
        </Content>

        <div className='xs:hidden xl:block w-[310px]'>
          <CreatePost />
          <RecentPost />
        </div>
      </Layout>
    </Content>
  );
}
