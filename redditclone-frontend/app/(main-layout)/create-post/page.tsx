'use client';

import { postApi, subredditApi } from '@/api';
import { PostRequest } from '@/client-codegen-api';
import { TextEditorRef } from '@/components/common/text-editor';
import { useAuthStore } from '@/stores';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Button, Empty, Input, Select, Typography, message } from 'antd';
import { useRouter } from 'next/navigation';
import { useMemo, useRef, useState } from 'react';

export interface CreatePostPageProps {}

interface CreatePostPayload {
  name: string;
  description: string;
  subredditName: string;
  url: string;
}

export default function CreatePostPage(props: CreatePostPageProps) {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const editorRef = useRef<any>(null);
  const [messageApi, contextHolder] = message.useMessage();
  const [postPayload, setPostPayload] = useState<CreatePostPayload>(() => ({
    name: '',
    description: '',
    subredditName: '',
    url: '',
  }));

  const { data: subredditList } = useQuery({
    queryKey: ['getSubredditDropdown'],
    queryFn: async () => await subredditApi.getAllSubreddits(),
    select: (data) => data as any,
  });

  const { mutate: createPost } = useMutation({
    mutationKey: ['createPost'],
    mutationFn: async (payload: PostRequest) => await postApi.createPost(payload),
    onSuccess: () => {
      messageApi.open({
        type: 'success',
        content: 'Post has been created successfully.',
      });
    },
  });

  const subredditOptionList = useMemo(
    () =>
      subredditList?.length > 0 ? subredditList?.map((item: any) => ({ value: item.name, label: item.name })) : [],
    [subredditList]
  );

  const handleSubmitPost = () => {
    let description = '';
    if (editorRef.current) description = editorRef.current.getContent();

    const payload = { ...postPayload, description };
    createPost(payload);
  };

  return (
    <>
      {!user?.userId && <Empty description='Please login to perform create post.' />}

      {user?.userId && (
        <div className='bg-white p-4 rounded'>
          {contextHolder}
          <Typography.Text className='text-lg font-medium'>Create a post</Typography.Text>
          <Select
            defaultValue={subredditOptionList[0]}
            size='large'
            style={{ width: '100%' }}
            className='mt-3'
            onChange={(value) => setPostPayload({ ...postPayload, subredditName: value })}
            options={subredditOptionList}
          />

          <Typography.Text className='text-sm font-semibold'>Title</Typography.Text>
          <Input
            size='large'
            className='mb-3 mt-2'
            onChange={(e) => setPostPayload({ ...postPayload, name: e.target.value })}
          />

          <Typography.Text className='text-sm font-semibold'>Url</Typography.Text>
          <Input
            size='large'
            className='mb-3 mt-2'
            onChange={(e) => setPostPayload({ ...postPayload, url: e.target.value })}
          />

          <Typography.Text className='text-sm font-semibold'>Description</Typography.Text>
          <TextEditorRef ref={editorRef} className='mt-2' />

          <div className='flex justify-end mt-3'>
            <Button onClick={() => router.push('/')} className='mr-2'>
              Cancel
            </Button>
            <Button type='primary' onClick={handleSubmitPost}>
              Post
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
