'use client';

import { Breadcrumb, Button, Layout, Menu } from 'antd';
import Image from 'next/image';

const { Header, Content, Footer } = Layout;

export default function Home() {
  return (
    <>
      <Layout className='layout'>
        <Header className='flex items-center justify-between'>
          <div className='flex items-center'>
            <Image alt='logo' src='/reddit-logo.svg' width={32} height={32} />
            <Image alt='logo' src='/reddit-logo-text.svg' width={57} height={18} style={{ marginLeft: '8px' }} />
          </div>

          <Button type='primary'>Login</Button>
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <div className='site-layout-content'></div>
        </Content>
      </Layout>
    </>
  );
}
