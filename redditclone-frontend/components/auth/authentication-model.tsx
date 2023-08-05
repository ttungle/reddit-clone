'use client';

import { authApi } from '@/api';
import { LoginRequestDto } from '@/client-codegen-api';
import { useAuthStore } from '@/stores';
import { useMutation } from '@tanstack/react-query';
import { Modal, Typography } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { useState } from 'react';
import { LoginForm } from './login-form';
import { RegisterForm } from './register-form';

export interface AuthenticationModelProps {
  authModalOpen: boolean;
  setAuthModalOpen: (isOpen: boolean) => void;
}

const { Text, Link } = Typography;

export function AuthenticationModel({ authModalOpen, setAuthModalOpen }: AuthenticationModelProps) {
  const [form] = useForm();
  const { setUser, setAccessToken } = useAuthStore();
  const [isLogin, setIsLogin] = useState(false);

  const { mutate: loginMutate } = useMutation({
    mutationKey: ['login'],
    mutationFn: async (payload: LoginRequestDto) => await authApi.login(payload),
    onSuccess: (data: any) => {
      setUser(data?.user);
      setAccessToken(data?.accessToken);
    },
  });

  const handleCancelLoginDialog = () => {
    setAuthModalOpen(false);
    form.resetFields();
  };

  const handleFinish = (values: any) => {
    if (values?.email) {
      console.log('>>> register');
    }

    const loginData: LoginRequestDto = {
      username: values?.username,
      password: values?.password,
    };

    loginMutate(loginData);
    setAuthModalOpen(false);
  };

  const handleFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <Modal
        title={isLogin ? 'Login' : 'Sign Up'}
        centered
        maskClosable={false}
        open={authModalOpen}
        onOk={form.submit}
        onCancel={handleCancelLoginDialog}
        transitionName='ant-zoom-big'
      >
        {isLogin && (
          <>
            <LoginForm form={form} onFinish={handleFinish} onFinishFailed={handleFinishFailed} />
            <div className='my-4'>
              <Text className='text-sm'>New to Reddit?</Text>{' '}
              <Link className='text-sm font-semibold' onClick={() => setIsLogin(false)}>
                Sign Up
              </Link>
            </div>
          </>
        )}

        {!isLogin && (
          <>
            <RegisterForm form={form} onFinish={handleFinish} onFinishFailed={handleFinishFailed} />
            <div className='my-4'>
              <Text className='text-sm'>Already a redditor?</Text>{' '}
              <Link className='text-sm font-semibold' onClick={() => setIsLogin(true)}>
                Login
              </Link>
            </div>
          </>
        )}
      </Modal>
    </>
  );
}
