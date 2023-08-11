'use client';

import { PostResponse, VoteDto, VoteDtoVoteTypeEnum } from '@/client-codegen-api';
import { Button, Card, Divider, Typography, message } from 'antd';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { BsThreeDots } from 'react-icons/bs';
import { FaRegMessage } from 'react-icons/fa6';
import { LiaShareSolid } from 'react-icons/lia';
import { PiArrowFatDown, PiArrowFatUp, PiGift } from 'react-icons/pi';
import { PostItemHeader } from './post-item-header';
import { useMutation } from '@tanstack/react-query';
import { voteApi } from '@/api';
import { useState } from 'react';

export interface PostItemProps {
  data: PostResponse;
  border?: boolean;
  className?: string;
}

export function PostItem({ data, border = true, className }: PostItemProps) {
  const [messageApi, contextHolder] = message.useMessage();
  const router = useRouter();
  const [vote, setVote] = useState(0);

  const { mutate: votePost } = useMutation({
    mutationKey: ['vote'],
    mutationFn: async (payload: VoteDto) => await voteApi.vote(payload),
    onError: (error: any) => {
      messageApi.open({
        type: 'error',
        content: error?.response?.data?.message ?? 'Failed to vote.',
      });
    },
  });

  const handlePostClick = () => {
    router.push(`/posts/${data?.id}`);
  };

  const handleUpVoteClick = (event: any) => {
    event.stopPropagation();
    votePost(
      { voteType: VoteDtoVoteTypeEnum.UPVOTE, postId: data?.id },
      {
        onSuccess: () => {
          setVote(1);
          if (data?.voteCount === -1) setVote(2);
          else setVote(1);
        },
        onError: () => {
          setVote(0);
        },
      }
    );
  };

  const handleDownVoteClick = (event: any) => {
    event.stopPropagation();
    votePost(
      { voteType: VoteDtoVoteTypeEnum.DOWNVOTE, postId: data?.id },
      {
        onSuccess: () => {
          if (data?.voteCount === 1) setVote(-2);
          else setVote(-1);
        },
        onError: () => {
          setVote(0);
        },
      }
    );
  };

  return (
    <>
      {contextHolder}

      <Card
        onClick={handlePostClick}
        className={clsx(
          'flex-nowrap w-full max-h-[650px] rounded cursor-pointer',
          {
            'outline-1 outline outline-gray-200 hover:outline-1 hover:outline-gray-400 hover:outline': border,
          },
          className
        )}
      >
        <Card.Grid
          hoverable={false}
          className='flex flex-col justify-start items-center bg-gray-50 text-center w-[6%] p-2'
        >
          <PiArrowFatUp
            onClick={handleUpVoteClick}
            className='text-2xl text-gray-400 hover:text-orange-600 hover:bg-gray-200 rounded transition-all'
          />
          <Typography.Text className='text-sm font-semibold my-1'>
            {data?.voteCount || data?.voteCount === 0 ? data.voteCount + vote : 0}
          </Typography.Text>
          <PiArrowFatDown
            onClick={handleDownVoteClick}
            className='text-2xl text-gray-400 hover:text-blue-600 hover:bg-gray-200 rounded transition-all'
          />
        </Card.Grid>
        <Card.Grid hoverable={false} className='w-[94%] p-0'>
          <PostItemHeader data={data} />

          <Typography.Paragraph
            className='mx-2 my-4 text-sm text-neutral-800 leading-6'
            ellipsis={{ rows: 8, expandable: true, symbol: 'more' }}
          >
            <span dangerouslySetInnerHTML={{ __html: data?.description ?? '' }} />
          </Typography.Paragraph>

          {border && <Divider className='my-1' />}

          <div className='flex items-center justify-start'>
            <Button
              type='text'
              icon={<FaRegMessage className='text-lg text-neutral-500' />}
              className='flex items-center py-4 ml-2 rounded px-1 text-xs font-semibold text-neutral-500'
            >
              {!data?.commentCount || data?.commentCount <= 0 ? '' : data?.commentCount} Comments
            </Button>
            <Button
              type='text'
              icon={<PiGift className='text-xl text-neutral-500' />}
              className='flex items-center py-4 ml-2 rounded px-1 text-xs font-semibold text-neutral-500'
            >
              Award
            </Button>
            <Button
              type='text'
              icon={<LiaShareSolid className='text-xl text-neutral-500' />}
              className='flex items-center py-4 ml-2 rounded px-1 text-xs font-semibold text-neutral-500'
            >
              Share
            </Button>
            <Button
              type='text'
              icon={<BsThreeDots className='text-xl text-neutral-500' />}
              className='flex items-center py-4 ml-2 rounded px-1 text-xs font-semibold text-neutral-500'
            />
          </div>
        </Card.Grid>
      </Card>
    </>
  );
}
