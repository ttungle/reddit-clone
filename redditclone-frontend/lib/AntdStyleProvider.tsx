'use client';

import { ConfigProvider } from 'antd';
import { PropsWithChildren } from 'react';
import StyledComponentsRegistry from './AntdRegistry';
import theme from '@/theme/theme-configure';

export function AntdStyleProvider({ children }: PropsWithChildren) {
  return (
    <ConfigProvider theme={theme}>
      <ConfigProvider
        theme={{
          token: {
            borderRadius: 16,
          },
        }}
      >
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </ConfigProvider>
    </ConfigProvider>
  );
}
