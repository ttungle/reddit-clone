'use client';

import { Layout, Menu } from 'antd';
import { usePathname, useRouter } from 'next/navigation';
import { ReactNode } from 'react';
import { AiOutlineReddit, AiOutlineStock } from 'react-icons/ai';
import { IoTrendingUp } from 'react-icons/io5';
import { MdSportsBasketball } from 'react-icons/md';
import { TbHome } from 'react-icons/tb';
import { CreatePost } from '../create-post';
import { PopularSubreddit } from '../popular-subreddit';

const { Content, Sider } = Layout;

export interface AppContentProps {
  children: ReactNode;
}

export function AppContent({ children }: AppContentProps) {
  const router = useRouter();
  const pathParams = usePathname();

  const items = [
    {
      key: '/',
      icon: <TbHome />,
      label: 'Home',
      onClick: () => router.push('/'),
    },
    {
      key: '/trend',
      icon: <IoTrendingUp />,
      label: 'Trend',
    },
    {
      key: '/subreddits',
      icon: <AiOutlineReddit />,
      label: 'Subreddits',
      onClick: () => router.push('/subreddits'),
    },
    {
      key: '',
      label: '',
      type: 'group',
    },
    {
      key: 'sport',
      icon: <MdSportsBasketball />,
      label: 'Sport',
      children: [
        {
          key: 'sport-1',
          label: 'NFL',
        },
        {
          key: 'sport-2',
          label: 'NBA',
        },
        {
          key: 'sport-3',
          label: 'Megan Anderson',
        },
        {
          key: 'sport-4',
          label: 'Atlanta Hawks',
        },
        {
          key: 'sport-5',
          label: 'Los Angeles Lakers',
        },
        {
          key: 'sport-6',
          label: 'Boston Celtics',
        },
        {
          key: 'sport-7',
          label: 'Arsenal F.C.',
        },
        {
          key: 'sport-8',
          label: 'Philadelphia 76ers',
        },
        {
          key: 'sport-9',
          label: 'Premier League',
        },
        {
          key: 'sport-10',
          label: 'UFC',
        },
      ],
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
    {
      key: 'Animals and Pets',
      label: 'Animals and Pets',
    },
    {
      key: 'Anime',
      label: 'Anime',
    },
    {
      key: 'Art',
      label: 'Art',
    },
    {
      key: 'Cars and Motor Vehicles',
      label: 'Cars and Motor Vehicles',
    },
    {
      key: 'Crafts and DIY',
      label: 'Crafts and DIY',
    },
    {
      key: 'Culture, Race, and Ethnicity',
      label: 'Culture, Race, and Ethnicity',
    },
    {
      key: 'Ethics and Philosophy',
      label: 'Ethics and Philosophy',
    },
    {
      key: 'Fashion',
      label: 'Fashion',
    },
    {
      key: 'Food and Drink',
      label: 'Food and Drink',
    },
  ];

  return (
    <Content className='lg:container lg:mx-auto lg:px-24 xs:px-0 mt-20 rounded '>
      <Layout className='bg-[#dae0e6]'>
        <Sider
          width={220}
          className='sticky top-20 xs:hidden xl:block rounded'
          style={{ height: 'calc(100vh - 80px)' }}
        >
          <Menu
            mode='inline'
            selectedKeys={[pathParams]}
            defaultSelectedKeys={['home']}
            className='rounded'
            style={{ height: 'calc(100vh - 80px)', overflow: 'auto' }}
            items={items}
          />
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
