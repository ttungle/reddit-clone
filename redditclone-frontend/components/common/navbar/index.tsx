'use client';

import { authApi, userApi } from '@/api';
import { RefreshTokenRequest } from '@/client-codegen-api';
import { AuthenticationModal } from '@/components/auth/authentication-modal';
import { useAuthStore } from '@/stores';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Avatar, Badge, Button, Dropdown, Layout, MenuProps, Typography } from 'antd';
import { useForm } from 'antd/es/form/Form';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { AiOutlineUser } from 'react-icons/ai';

const { Header } = Layout;

export interface NavBarProps {}

export function NavBar(props: NavBarProps) {
  const router = useRouter();
  const [form] = useForm();
  const queryClient = useQueryClient();
  const { user, refreshToken, setUser, clearToken } = useAuthStore((state) => ({
    user: state.user,
    refreshToken: state.refreshToken,
    setUser: state.actions.setUser,
    clearToken: state.actions.clearToken,
  }));
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const { data: userData, error } = useQuery({
    queryKey: ['user'],
    queryFn: async () => await userApi.getMe(),
    retry: 1,
    enabled: typeof window !== 'undefined' && Boolean(localStorage?.getItem('access_token')),
  });

  const { mutate: logoutMutate } = useMutation({
    mutationKey: ['logout'],
    mutationFn: async (payload: RefreshTokenRequest) => await authApi.logout(payload),
  });

  useEffect(() => {
    if (userData?.data && (error as any)?.response?.status !== 401) setUser(userData.data);
    if ((error as any)?.response?.status === 401) setUser(undefined);
  }, [userData, refreshToken, error]);

  const handleLogoutClick = () => {
    if (refreshToken) logoutMutate({ refreshToken, user });
    queryClient.invalidateQueries({ queryKey: ['user'] });
    clearToken();
  };

  const handleOpenLoginDialog = () => {
    setAuthModalOpen(true);
    form.resetFields();
  };

  const items = useMemo<MenuProps['items']>(
    () => [
      {
        key: '2',
        label: <span className='px-4'>Profile</span>,
        onClick: () => router.push('/profile'),
      },
      {
        key: '1',
        label: <span className='px-4'>Logout</span>,
        onClick: handleLogoutClick,
      },
    ],
    [user]
  );

  return (
    <>
      <Header className='fixed top-0 left-0 right-0 z-[999] flex items-center justify-between bg-white h-12'>
        <div className='flex items-center cursor-pointer' onClick={() => router.push('/')}>
          <Image alt='logo' src='/reddit-logo.svg' width={32} height={32} />
          <Image alt='logo' src='/reddit-logo-text.svg' width={57} height={18} className='ml-2' />
        </div>

        {user?.userId && (
          <div className='flex items-center'>
            <Dropdown menu={{ items }} placement='bottomRight' arrow={{ pointAtCenter: true }}>
              <div className='flex items-center'>
                <Badge dot status='success' className='flex items-center justify-start'>
                  <Avatar icon={<AiOutlineUser />} className='bg-[#fde3cf] text-[#fa420f]' />
                </Badge>

                <Typography.Text ellipsis className='px-4 text-sm'>
                  {user?.username}
                </Typography.Text>
              </div>
            </Dropdown>
          </div>
        )}

        {!user?.userId && (
          <Button type='primary' onClick={handleOpenLoginDialog}>
            Login
          </Button>
        )}
      </Header>

      <AuthenticationModal authModalOpen={authModalOpen} setAuthModalOpen={setAuthModalOpen} />
    </>
  );
}
