'use client';

import { Layout, Button } from 'antd';
import Image from 'next/image';

const { Header } = Layout;

export interface NavBarProps {}

export function NavBar(props: NavBarProps) {
  return (
    <Header className='flex items-center justify-between'>
      <div className='flex items-center'>
        <Image alt='logo' src='/reddit-logo.svg' width={32} height={32} />
        <Image alt='logo' src='/reddit-logo-text.svg' width={57} height={18} style={{ marginLeft: '8px' }} />
      </div>

      <Button type='primary'>Login</Button>
    </Header>
  );
}
