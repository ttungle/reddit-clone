'use client';

import { useAuthStore } from '@/stores';
import { Descriptions } from 'antd';

export interface UserInfoProps {}

export function UserInfo(props: UserInfoProps) {
  const user = useAuthStore((state) => state.user);

  return (
    <Descriptions title='User Info'>
      <Descriptions.Item label='Id'>{user?.userId}</Descriptions.Item>
      <Descriptions.Item label='UserName'>{user?.username}</Descriptions.Item>
      <Descriptions.Item label='Email'>{user?.email}</Descriptions.Item>
      <Descriptions.Item label='Created'>{user?.created}</Descriptions.Item>
      <Descriptions.Item label='Enabled'>{`${user?.enabled}`}</Descriptions.Item>
    </Descriptions>
  );
}
