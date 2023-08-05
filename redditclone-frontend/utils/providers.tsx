'use client';

import { AntdStyleProvider } from '@/lib/AntdStyleProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as React from 'react';

export interface ProvidersProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  const [client] = React.useState(new QueryClient());
  return (
    <QueryClientProvider client={client}>
      <AntdStyleProvider>{children}</AntdStyleProvider>
    </QueryClientProvider>
  );
}
