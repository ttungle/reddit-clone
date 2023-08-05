import { Form, Input } from 'antd';
import * as React from 'react';

export interface RegisterFormProps {
  form: any;
  onFinish: (values: any) => void;
  onFinishFailed: (ErrorInfo: any) => void;
}

type FieldType = {
  email?: string;
  username?: string;
  password?: string;
};

export function RegisterForm({ form, onFinish, onFinishFailed }: RegisterFormProps) {
  return (
    <>
      <Form
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete='off'
        className='pt-4'
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 100 }}
        style={{ maxWidth: 600 }}
        layout='vertical'
      >
        <Form.Item<FieldType>
          label='Email'
          name='email'
          rules={[{ required: true, message: 'Please input your email!' }]}
          className='mb-2'
        >
          <Input size='large' />
        </Form.Item>

        <Form.Item<FieldType>
          label='Username'
          name='username'
          rules={[{ required: true, message: 'Please input your username!' }]}
          className='mb-2'
        >
          <Input size='large' />
        </Form.Item>

        <Form.Item<FieldType>
          label='Password'
          name='password'
          rules={[{ required: true, message: 'Please input your password!' }]}
          className='mb-2'
        >
          <Input.Password size='large' />
        </Form.Item>
      </Form>
    </>
  );
}
