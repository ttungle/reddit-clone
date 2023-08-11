import { CreateSubredditModal } from '@/components/home';
import { useModalStore } from '@/stores';
import { Button, Card, Divider, Typography } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export interface CreatePostProps {}

export function CreatePost(props: CreatePostProps) {
  const router = useRouter();
  const setShowCreateSubredditModal = useModalStore((state) => state.actions.setShowCreateSubredditModal);

  return (
    <>
      <Card
        bodyStyle={{ padding: 0 }}
        className='rounded sticky top-20 max-h-[650px] cursor-pointer outline-1 outline outline-gray-200 hover:outline-1 hover:outline-gray-400 hover:outline'
      >
        <div className='h-[34px] w-full bg-[url(/img/create-post-banner.png)] bg-no-repeat bg-cover' />

        <div className='relative'>
          <Image
            alt='home-create-post'
            src='/img/create-post-reddit-avatar.png'
            width={40}
            height={68}
            className='relative -top-3 left-3'
          />
          <Typography.Text className='ml-6 mt-7 font-medium'>Home</Typography.Text>
        </div>

        <div className='px-3'>
          <Typography.Text className='text-sm'>
            Your personal Reddit frontpage. Come here to check in with your favorite communities.
          </Typography.Text>
        </div>

        <div className='px-3'>
          <Divider className='my-5' />
        </div>

        <div className='mx-3 mb-3'>
          <Button type='primary' block className='text-sm font-medium' onClick={() => router.push('/create-post')}>
            Create Post
          </Button>
          <Button block className='mt-3 text-sm font-medium' onClick={() => setShowCreateSubredditModal(true)}>
            Create Community
          </Button>
        </div>
      </Card>

      <CreateSubredditModal />
    </>
  );
}
