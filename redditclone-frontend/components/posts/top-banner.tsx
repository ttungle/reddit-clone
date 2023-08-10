'use client';

import { Button } from 'antd';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { CgFileDocument } from 'react-icons/cg';
import { MdClose } from 'react-icons/md';

export interface TopBannerProps {
  postData: any;
}

export function TopBanner({ postData }: TopBannerProps) {
  const router = useRouter();

  return (
    <div className='flex items-center bg-black h-12'>
      <div className='container mx-auto flex items-center justify-between'>
        <p className='flex items-center m-0 text-gray-300 text-sm font-medium'>
          <CgFileDocument />
          {postData?.name}
        </p>

        <Button
          onClick={() => router.push('/')}
          type='text'
          icon={<MdClose />}
          className='flex items-center text-white'
        >
          Close
        </Button>
      </div>
    </div>
  );
}
