import { Form, Input } from 'antd';
import * as React from 'react';

export interface LoginFormProps {
  form: any;
  onFinish: (values: any) => void;
  onFinishFailed: (errorInfo: any) => void;
}

type FieldType = {
  username?: string;
  password?: string;
};

export function LoginForm({ form, onFinish, onFinishFailed }: LoginFormProps) {
  return (
    <>
      <Form
        form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 100 }}
        style={{ maxWidth: 600 }}
        layout='vertical'
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete='off'
        className='pt-4'
      >
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
