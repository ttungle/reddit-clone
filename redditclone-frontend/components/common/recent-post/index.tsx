import { Avatar, Card, List, Typography } from 'antd';

export interface RecentPostProps {
  data?: any[];
}

const data = [
  {
    title: 'Ant Design Title 1',
  },
  {
    title: 'Ant Design Title 2',
  },
  {
    title: 'Ant Design Title 3',
  },
  {
    title: 'Ant Design Title 4',
  },
];

export function RecentPost(props: RecentPostProps) {
  return (
    <Card
      bodyStyle={{ padding: 12, paddingTop: 8 }}
      className='rounded sticky top-[420px] max-h-[650px] cursor-pointer outline-1 outline outline-gray-200 mt-5'
    >
      <Typography.Text strong className='text-xs uppercase'>
        Recent Posts
      </Typography.Text>
      <List
        itemLayout='horizontal'
        dataSource={data}
        renderItem={(item, index) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`} />}
              title={
                <a href='#' className='text-sm hover:underline'>
                  {item.title}
                </a>
              }
              description={
                <Typography.Paragraph className='text-sm text-neutral-400' ellipsis={{ rows: 2, expandable: false }}>
                  Design, a design language for background applications, is refined by Ant UED
                </Typography.Paragraph>
              }
            />
          </List.Item>
        )}
      />
    </Card>
  );
}
