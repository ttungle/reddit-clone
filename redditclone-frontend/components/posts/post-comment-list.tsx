'use client';

import { commentApi } from '@/api';
import { CommentDto } from '@/client-codegen-api';
import { useQuery } from '@tanstack/react-query';
import { Avatar, List } from 'antd';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useParams } from 'next/navigation';

export interface PostCommentListProps {}

dayjs.extend(relativeTime);

export function PostCommentList(props: PostCommentListProps) {
  const { id } = useParams();

  const { data: commentList } = useQuery({
    queryKey: ['getCommentList', id],
    queryFn: async () => await commentApi.getAllCommentsByPost(Number(id)),
    select: (data) => data?.data as Array<CommentDto>,
  });

  return (
    <List
      itemLayout='horizontal'
      dataSource={commentList}
      className='bg-white px-12'
      renderItem={(item, index) => (
        <List.Item>
          <List.Item.Meta
            avatar={<Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`} />}
            title={
              <div className='flex items-center'>
                <a href='#' className='text-sm text-gray-800 hover:underline'>
                  {item?.userName}
                </a>

                <span className='ml-1 text-xs text-neutral-400'> • {dayjs(item?.createdDate).fromNow()}</span>
              </div>
            }
            description={<span dangerouslySetInnerHTML={{ __html: item?.content ?? '' }}></span>}
          />
        </List.Item>
      )}
    />
  );
}
