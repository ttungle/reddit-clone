'use client';

import { Layout, Menu, MenuProps } from 'antd';
import { ReactNode } from 'react';

const { Content, Sider } = Layout;

export interface AppContentProps {
  children: ReactNode;
}

export function AppContent({ children }: AppContentProps) {
  const items2: MenuProps['items'] = ['', '', ''].map((icon, index) => {
    const key = String(index + 1);

    return {
      key: `sub${key}`,
      icon: <div></div>,
      label: `subnav ${key}`,

      children: new Array(4).fill(null).map((_, j) => {
        const subKey = index * 4 + j + 1;
        return {
          key: subKey,
          label: `option${subKey}`,
        };
      }),
    };
  });

  return (
    <Content style={{ padding: '0 500px' }}>
      <Layout style={{ padding: '24px 0' }}>
        <Sider width={200}>
          <Menu
            mode='inline'
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%' }}
            items={items2}
          />
        </Sider>
        <Content style={{ padding: '0 24px', minHeight: 280 }}>
          <div className='site-layout-content'>{children}</div>
        </Content>

        <div>Popular</div>
      </Layout>
    </Content>
  );
}
