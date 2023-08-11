'use client';

import { commentApi } from '@/api';
import { useAuthStore } from '@/stores';
import { useQuery } from '@tanstack/react-query';
import { List } from 'antd';

export function MyComment() {
  const user = useAuthStore((state) => state.user);

  const { data: myCommentList } = useQuery({
    queryKey: ['myComment'],
    queryFn: async () => await commentApi.getAllCommentsByUsername(user?.username),
  });

  return (
    <List
      itemLayout='horizontal'
      dataSource={(myCommentList?.data as any) ?? []}
      renderItem={(item: any, index) => (
        <List.Item>
          <List.Item.Meta
            title={
              <a href={`/posts/${item?.postId}`} target='_blank'>
                {item.userName}
              </a>
            }
            description={<span dangerouslySetInnerHTML={{ __html: item?.content }}></span>}
          />
        </List.Item>
      )}
    />
  );
}
