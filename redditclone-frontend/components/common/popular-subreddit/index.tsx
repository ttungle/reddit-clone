'use client';

import { subredditApi } from '@/api';
import { useQuery } from '@tanstack/react-query';
import { Avatar, Card, List, Typography } from 'antd';
import Link from 'next/link';

export interface PopularSubredditProps {
  data?: any[];
}

export function PopularSubreddit(props: PopularSubredditProps) {
  const { data: subredditList } = useQuery({
    queryKey: ['getSubreddit'],
    queryFn: async () => await subredditApi.getAllSubreddits(),
  });

  return (
    <Card
      bodyStyle={{ padding: 12, paddingTop: 8 }}
      className='rounded sticky top-[420px] max-h-[650px] cursor-pointer outline-1 outline outline-gray-200 mt-5'
    >
      <Typography.Text strong className='text-xs uppercase'>
        Popular Communities
      </Typography.Text>
      <List
        itemLayout='horizontal'
        dataSource={Array.isArray(subredditList) ? (subredditList as any)?.slice(0, 5) : []}
        renderItem={(item: any, index) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`} />}
              title={
                <a href='#' className='text-sm hover:underline'>
                  {item.name}
                </a>
              }
              description={
                <Typography.Paragraph className='text-sm text-neutral-400' ellipsis={{ rows: 2, expandable: false }}>
                  {item?.description}
                </Typography.Paragraph>
              }
            />
          </List.Item>
        )}
      />
      <Link href='/subreddits' target='_self' className='flex justify-end text-xs text-gray-400 hover:text-gray-500'>
        See more
      </Link>
    </Card>
  );
}
