import { BaseApiResponseListPostResponse } from '@/client-codegen-api';
import { PostItem } from '@/components/common/post-item';
import { getApiUrl } from '@/utils';

async function getData() {
  const res = await fetch(`${getApiUrl('/api/v1')}/posts`);

  if (!res.ok) {
    throw new Error('Failed to get post data.');
  }

  return res.json();
}

export default async function Home() {
  const data: BaseApiResponseListPostResponse = await getData();

  return <>{data?.data && data?.data.map((post) => <PostItem key={post?.id} data={post} />)}</>;
}
