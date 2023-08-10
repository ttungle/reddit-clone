import * as React from 'react';

export interface PostItemHeaderProps {
  data: any;
}

export function PostItemHeader({ data }: PostItemHeaderProps) {
  return (
    <>
      <div className='flex items-center m-2'>
        <strong className='text-xs'>{data.subredditName}</strong>
        <p className='my-0 ml-1 text-xs text-neutral-400'>
          • Posted by {data.userName} {data.duration}
        </p>
      </div>

      <p className='mx-2 text-lg font-medium'>{data.name}</p>
    </>
  );
}
