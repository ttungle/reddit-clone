import { Button, Card, Divider, Typography } from 'antd';
import * as React from 'react';
import { PiArrowFatUp, PiArrowFatDown } from 'react-icons/pi';
import { FaRegMessage } from 'react-icons/fa6';
import { PiGift } from 'react-icons/pi';
import { LiaShareSolid } from 'react-icons/lia';
import { BsThreeDots } from 'react-icons/bs';

export interface PostItemProps {}

export function PostItem(props: PostItemProps) {
  return (
    <Card className='flex-nowrap w-full max-h-[650px] mb-4 rounded cursor-pointer outline-1 outline outline-gray-200 hover:outline-1 hover:outline-gray-400 hover:outline'>
      <Card.Grid
        hoverable={false}
        className='flex flex-col justify-start items-center bg-gray-50 text-center w-[6%] p-2'
      >
        <PiArrowFatUp className='text-2xl text-gray-400 hover:text-orange-600 hover:bg-gray-200 rounded transition-all' />
        <Typography.Text className='text-sm font-semibold my-1'>100</Typography.Text>
        <PiArrowFatDown className='text-2xl text-gray-400 hover:text-blue-600 hover:bg-gray-200 rounded transition-all' />
      </Card.Grid>
      <Card.Grid hoverable={false} className='w-[94%] p-0'>
        <div className='m-2'>
          <Typography.Text strong className='text-xs'>
            r/First subreddit
          </Typography.Text>
          <Typography.Text className='text-xs text-neutral-400'> • Posted by u/user 9 hours ago</Typography.Text>
        </div>

        <div className='mx-2'>
          <Typography.Text className='text-lg font-medium' ellipsis>
            What should I do with these? What should I do with these? What should I do with these?
          </Typography.Text>
          <Typography.Paragraph
            className='my-4 text-sm text-neutral-800 leading-6'
            ellipsis={{ rows: 8, expandable: true, symbol: 'more' }}
          >
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.
            Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis,
            ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo,
            fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae,
            justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper
            nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim.
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.
            Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis,
            ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo,
            fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae,
            justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper
            nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim.
          </Typography.Paragraph>
        </div>

        <Divider className='my-1' />

        <div className='flex items-center justify-start'>
          <Button
            type='text'
            icon={<FaRegMessage className='text-lg text-neutral-500' />}
            className='flex items-center py-4 ml-2 rounded px-1 text-xs font-semibold text-neutral-500'
          >
            Comments
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
  );
}
