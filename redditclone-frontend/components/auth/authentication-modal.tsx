'use client';

import { authApi } from '@/api';
import { LoginRequestDto, RegisterRequestDto } from '@/client-codegen-api';
import { useAuthStore } from '@/stores';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Modal, Typography, message } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { useState } from 'react';
import { LoginForm } from './login-form';
import { RegisterForm } from './register-form';

export interface AuthenticationModalProps {
  authModalOpen: boolean;
  setAuthModalOpen: (isOpen: boolean) => void;
}

const { Text, Link } = Typography;

export function AuthenticationModal({ authModalOpen, setAuthModalOpen }: AuthenticationModalProps) {
  const [form] = useForm();
  const queryClient = useQueryClient();
  const [messageApi, contextHolder] = message.useMessage();
  const { setAccessToken, setRefreshToken } = useAuthStore((state) => ({
    setAccessToken: state.actions.setAccessToken,
    setRefreshToken: state.actions.setRefreshToken,
  }));
  const [isLogin, setIsLogin] = useState(false);

  const { mutate: loginMutate } = useMutation({
    mutationKey: ['login'],
    mutationFn: async (payload: LoginRequestDto) => await authApi.login(payload),
    onSuccess: (data: any) => {
      setAccessToken(data?.accessToken);
      setRefreshToken(data?.refreshToken);
      queryClient.invalidateQueries({ queryKey: ['user'] });
      setAuthModalOpen(false);
      form.resetFields();
    },
    onError: (error: any) => {
      messageApi.open({
        type: 'error',
        content: error?.response?.data?.message ?? 'Failed to login.',
      });
    },
  });

  const { mutate: registerMutate } = useMutation({
    mutationKey: ['register'],
    mutationFn: async (payload: RegisterRequestDto) => await authApi.signup(payload),
    onSuccess: (data: any) => {
      setAuthModalOpen(false);
      form.resetFields();
      messageApi.open({
        type: 'success',
        content:
          (data?.message ?? 'Signed up successfully.') + '. Please verify your account by clicking link in your email',
      });
    },
    onError: (error: any) => {
      messageApi.open({
        type: 'error',
        content: error?.response?.data?.message ?? 'Failed to sign up.',
      });
    },
  });

  const handleCancelLoginDialog = () => {
    setAuthModalOpen(false);
    form.resetFields();
  };

  const handleFinish = (values: any) => {
    if (values?.email) {
      const registerData: RegisterRequestDto = {
        email: values?.email,
        username: values?.username,
        password: values?.password,
      };
      registerMutate(registerData);
      return;
    }

    const loginData: LoginRequestDto = {
      username: values?.username,
      password: values?.password,
    };
    loginMutate(loginData);
  };

  const handleFinishFailed = (errorInfo: any) => {
    messageApi.open({
      type: 'error',
      content: errorInfo?.message ?? errorInfo,
    });
  };

  return (
    <>
      {contextHolder}
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
