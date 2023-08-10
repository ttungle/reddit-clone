import { PostWithComment } from '@/components/posts/post-with-comment';
import { TopBanner } from '@/components/posts/top-banner';
import { getApiUrl } from '@/utils';

export interface PostDetailPageProps {
  params: { id: string };
}

async function getPostDetailData(postId: string | number) {
  const res = await fetch(`${getApiUrl('/api/v1')}/posts/${postId}`, { cache: 'force-cache' });
  if (!res.ok) {
    throw new Error('Failed to get post detail data.');
  }
  return res.json();
}

export default async function PostDetailPage({ params }: PostDetailPageProps) {
  const { id } = params;
  const postData = await getPostDetailData(id);

  return (
    <>
      <TopBanner postData={postData?.data} />
      <div className='container mx-auto mt-10'>
        <PostWithComment postData={postData?.data} />
      </div>
    </>
  );
}
