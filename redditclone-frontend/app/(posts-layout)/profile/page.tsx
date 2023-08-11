'use client';

import { MyComment } from '@/components/profile/my-comment';
import { MyPost } from '@/components/profile/my-post';
import { UserInfo } from '@/components/profile/user-info';
import { Tabs, TabsProps } from 'antd';
import * as React from 'react';

const items: TabsProps['items'] = [
  {
    key: '1',
    label: `User Information`,
    children: <UserInfo />,
  },
  {
    key: '2',
    label: `My posts`,
    children: <MyPost />,
  },
  {
    key: '3',
    label: `My comments`,
    children: <MyComment />,
  },
];

export default function ProfilePage() {
  return (
    <div className='container mx-auto bg-white p-4 rounded mt-5'>
      <Tabs defaultActiveKey='1' items={items} />
    </div>
  );
}
