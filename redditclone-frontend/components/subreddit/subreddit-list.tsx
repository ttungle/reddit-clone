'use client';

import { subredditApi } from '@/api';
import { useQuery } from '@tanstack/react-query';
import { List, Space, Typography } from 'antd';
import * as React from 'react';
import { CgLoadbarDoc } from 'react-icons/cg';

export interface SubredditListProps {}

const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

export function SubredditList(props: SubredditListProps) {
  const { data: subredditList } = useQuery({
    queryKey: ['getSubreddit'],
    queryFn: async () => await subredditApi.getAllSubreddits(),
  });

  return (
    <div className='bg-white p-4 rounded'>
      <Typography.Text className='mb-2 text-md font-semibold'>Subreddit List</Typography.Text>
      <List
        itemLayout='horizontal'
        dataSource={subredditList as any}
        renderItem={(item: any, index) => (
          <List.Item
            actions={[<IconText icon={CgLoadbarDoc} text={`${item.totalPosts} posts`} key='list-vertical-star-o' />]}
          >
            <List.Item.Meta title={<a href='#'>{item.name}</a>} description={item.description} />
          </List.Item>
        )}
      />
    </div>
  );
}
