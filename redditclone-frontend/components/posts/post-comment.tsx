'use client';

import { useAuthStore } from '@/stores';
import { Button, Typography, message } from 'antd';
import React, { useRef } from 'react';
import { TextEditorRef } from '../common/text-editor';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { commentApi } from '@/api';
import { CommentDto } from '@/client-codegen-api';
import { useParams } from 'next/navigation';

export interface PostCommentProps {}

export function PostComment(props: PostCommentProps) {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const [messageApi, contextHolder] = message.useMessage();
  const user = useAuthStore((state) => state.user);
  const editorRef = useRef<any>(null);

  const { mutate: createComment } = useMutation({
    mutationKey: ['createComment'],
    mutationFn: async (payload: CommentDto) => await commentApi.createComment(payload),
    onSuccess: () => {
      messageApi.open({
        type: 'success',
        content: 'Comment has been added successfully.',
      });
      queryClient.invalidateQueries(['getCommentList']);
      if (editorRef.current) editorRef.current.setContent('');
    },
  });

  const handleCommentClick = () => {
    let content = '';
    if (editorRef.current) content = editorRef.current.getContent();

    if (!content) return;

    const payload = {
      postId: Number(id),
      content,
      userName: user?.username,
    } as CommentDto;

    createComment(payload);
  };

  return (
    <>
      {contextHolder}
      <div className='bg-white px-12 py-6'>
        <Typography.Text className='text-sm'>
          Comment as <Typography.Link href={'/profile'}>{user?.username}</Typography.Link>
        </Typography.Text>

        <TextEditorRef ref={editorRef} className='mt-3' placeholder='What are your thoughts?' />

        <div className='flex justify-end items-center mt-3'>
          <Button type='primary' onClick={handleCommentClick}>
            Comment
          </Button>
        </div>
      </div>
    </>
  );
}
