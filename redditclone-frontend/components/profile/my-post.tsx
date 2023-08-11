'use client';

import { postApi } from '@/api';
import { useAuthStore } from '@/stores';
import { useQuery } from '@tanstack/react-query';
import { List } from 'antd';

export interface MyPostProps {}

export function MyPost(props: MyPostProps) {
  const user = useAuthStore((state) => state.user);

  const { data: myPostList } = useQuery({
    queryKey: ['myPost'],
    queryFn: async () => await postApi.getPostsByUsername(user?.username),
  });

  return (
    <List
      itemLayout='horizontal'
      dataSource={(myPostList?.data as any) ?? []}
      renderItem={(item: any, index) => (
        <List.Item>
          <List.Item.Meta
            title={
              <a href={`/posts/${item?.id}`} target='_blank'>
                {item.name}
              </a>
            }
            description={<span dangerouslySetInnerHTML={{ __html: item?.description }}></span>}
          />
        </List.Item>
      )}
    />
  );
}
