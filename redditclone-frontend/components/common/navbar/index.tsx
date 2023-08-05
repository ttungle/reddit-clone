'use client';

import { AuthenticationModel } from '@/components/auth/authentication-model';
import { useAuthStore } from '@/stores';
import { Avatar, Button, Dropdown, Layout, MenuProps, Popover } from 'antd';
import { useForm } from 'antd/es/form/Form';
import Image from 'next/image';
import { useMemo, useState } from 'react';
import { AiOutlineUser } from 'react-icons/ai';

const { Header } = Layout;

export interface NavBarProps {}

export function NavBar(props: NavBarProps) {
  const [form] = useForm();
  const user = useAuthStore((state) => state.user);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const items = useMemo<MenuProps['items']>(
    () => [
      {
        key: '2',
        label: <span className='px-4'>{user?.username}</span>,
        disabled: true,
      },
      {
        key: '1',
        label: <span className='px-4'>Logout</span>,
      },
    ],
    [user]
  );

  const handleOpenLoginDialog = () => {
    setAuthModalOpen(true);
    form.resetFields();
  };

  return (
    <>
      <Header className='flex items-center justify-between'>
        <div className='flex items-center'>
          <Image alt='logo' src='/reddit-logo.svg' width={32} height={32} />
          <Image alt='logo' src='/reddit-logo-text.svg' width={57} height={18} style={{ marginLeft: '8px' }} />
        </div>

        {user?.userId && (
          <Dropdown menu={{ items }} placement='bottomRight' arrow={{ pointAtCenter: true }}>
            <Avatar icon={<AiOutlineUser />} style={{ backgroundColor: '#fde3cf', color: '#fa420f' }} />
          </Dropdown>
        )}

        {!user?.userId && (
          <Button type='primary' onClick={handleOpenLoginDialog}>
            Login
          </Button>
        )}
      </Header>

      <AuthenticationModel authModalOpen={authModalOpen} setAuthModalOpen={setAuthModalOpen} />
    </>
  );
}
