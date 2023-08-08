'use client';

import { Layout, Menu } from 'antd';
import { ReactNode } from 'react';
import { AiOutlineStock } from 'react-icons/ai';
import { IoTrendingUp } from 'react-icons/io5';
import { TbHome } from 'react-icons/tb';
import { CreatePost } from '../create-post';
import { PopularSubreddit } from '../popular-subreddit';

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
          label: 'Tesla',
        },
        {
          key: 'business-2',
          label: 'Best Buy',
        },
      ],
    },
  ];

  return (
    <Content className='lg:container lg:mx-auto lg:px-36 xs:px-0 mt-28'>
      <Layout>
        <Sider width={200} className='sticky top-28 xs:hidden xl:block' style={{ height: '70vh' }}>
          <Menu mode='inline' defaultSelectedKeys={['home']} style={{ height: '70vh' }} items={items} />
        </Sider>

        <Content className='px-6 min-h-[280px]'>
          <div className='site-layout-content'>{children}</div>
        </Content>

        <div className='xs:hidden xl:block w-[310px]'>
          <CreatePost />
          <PopularSubreddit />
        </div>
      </Layout>
    </Content>
  );
}
