import { subredditApi } from '@/api';
import { SubredditDto } from '@/client-codegen-api';
import { useModalStore } from '@/stores';
import { useMutation } from '@tanstack/react-query';
import { Form, Input, Modal, Typography, message } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { AiOutlineInfoCircle } from 'react-icons/ai';

export interface CreateSubredditModalProps {}

type FieldType = {
  name?: string;
  description?: string;
};

export function CreateSubredditModal(props: CreateSubredditModalProps) {
  const [form] = useForm();
  const { showCreateSubredditModal, setShowCreateSubredditModal } = useModalStore((state) => ({
    showCreateSubredditModal: state.showCreateSubredditModal,
    setShowCreateSubredditModal: state.actions.setShowCreateSubredditModal,
  }));
  const [messageApi, contextHolder] = message.useMessage();

  const { mutate: createSubreddit } = useMutation({
    mutationKey: ['createSubreddit'],
    mutationFn: async (payload: SubredditDto) => await subredditApi.createSubreddit(payload),
    onSuccess: () => {
      setShowCreateSubredditModal(false);
      messageApi.open({
        type: 'success',
        content: 'Subreddit is created successfully.',
      });
    },
  });

  const handleFormSubmit = (values: FieldType) => {
    const createSubredditPayload = {
      name: `r/${values?.name}`,
      description: values?.description,
    };
    createSubreddit(createSubredditPayload);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const handleCancelClick = () => {
    setShowCreateSubredditModal(false);
    form.resetFields();
  };

  return (
    <>
      {contextHolder}
      <Modal
        title='Create a community'
        centered
        open={showCreateSubredditModal}
        onOk={form.submit}
        onCancel={handleCancelClick}
      >
        <Typography.Text className='text-sm font-semibold'>Name</Typography.Text>
        <div className='flex items-center'>
          <Typography.Text className='block text-xs text-gray-400'>
            Community names including capitalization cannot be changed.
          </Typography.Text>
          <AiOutlineInfoCircle className='text-gray-500 ml-1' />
        </div>

        <Form
          form={form}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 160 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={handleFormSubmit}
          onFinishFailed={onFinishFailed}
          autoComplete='off'
          layout='vertical'
        >
          <Form.Item<FieldType>
            label=''
            name='name'
            className='mt-3'
            rules={[{ required: true, message: 'Please input subreddit name.' }]}
          >
            <Input addonBefore={'r/'} size='large' />
          </Form.Item>

          <Typography.Text className='text-sm font-semibold'>Description</Typography.Text>
          <Form.Item<FieldType>
            label=''
            name='description'
            className='mt-2'
            rules={[{ required: true, message: 'Please input subreddit description.' }]}
          >
            <Input size='large' />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
