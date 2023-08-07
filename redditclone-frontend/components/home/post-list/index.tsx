import { PostItem } from '@/components/common/post-item';

export interface PostListProps {}

export function PostList(props: PostListProps) {
  return (
    <>
      <PostItem />
      <PostItem />
      <PostItem />
      <PostItem />
      <PostItem />
    </>
  );
}
