import { SubredditList } from '@/components/subreddit/subreddit-list';
import * as React from 'react';

export interface SubredditListPageProps {}

export default function SubredditListPage(props: SubredditListPageProps) {
  return (
    <div>
      <SubredditList />
    </div>
  );
}
