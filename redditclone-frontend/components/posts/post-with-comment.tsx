import { Divider } from 'antd';
import { PostItem } from '../common/post-item';
import { PostComment } from './post-comment';
import { PostCommentList } from './post-comment-list';

export interface PostWithCommentProps {
  postData: any;
}

export function PostWithComment({ postData }: PostWithCommentProps) {
  return (
    <>
      <PostItem data={postData} border={false} />
      <PostComment />
      <Divider className='m-0' />
      <PostCommentList />
    </>
  );
}
