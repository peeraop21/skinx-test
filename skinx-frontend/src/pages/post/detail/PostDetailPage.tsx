import { getPost as postServiceGetPost } from '@/services/postService';
import { Post } from '@/types/post';
import { getColorCodeFromText } from '@/utils/style';
import { Avatar, Button, Card, Flex, Result, Skeleton, Tag, Tooltip, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DOMPurify from 'dompurify';
import { formatDate } from '@/utils/format';
import { TagOutlined } from '@ant-design/icons';
const { Meta } = Card;
const { Text } = Typography;

const PostDetailPage: React.FC = () => {
  const { id } = useParams<string>();
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigator = useNavigate();

  const getPost = async () => {
    setIsLoading(true);
    if (id) {
      const result = await postServiceGetPost(parseInt(id));
      setPost(result);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getPost();
  }, []);

  useEffect(() => {
    if (post) {
      setIsLoading(false);
    }
  }, [post]);
  return (
    <>
      {' '}
      <Card>
        <Skeleton loading={isLoading} avatar paragraph={{ rows: 10 }} active>
          {post ? (
            <>
              <Meta
                avatar={
                  <Tooltip title={post.createdBy} placement="top">
                    <Avatar size={'large'} style={{ backgroundColor: getColorCodeFromText(post.createdBy!) }}>
                      {post.createdBy ? post.createdBy[0] : null}
                    </Avatar>
                  </Tooltip>
                }
                title={post.title}
                description={<Text type="secondary">{post.createdBy + ' posted at ' + formatDate(post.createdAt!)}</Text>}
              />

              <Typography.Paragraph style={{ marginTop: '1rem' }}>
                <Flex gap="4px 0" wrap>
                  {post.tags
                    ? post.tags!.map((tag) => (
                        <Tag key={tag} color={getColorCodeFromText(tag)}>
                          <TagOutlined /> {tag}
                        </Tag>
                      ))
                    : null}
                </Flex>
                <div className="mt-2" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }} />{' '}
              </Typography.Paragraph>
            </>
          ) : (
            <Result
              status="404"
              title="404"
              subTitle="Sorry, the page you visited does not exist."
              extra={
                <Button type="primary" onClick={() => navigator('/')}>
                  Back Home
                </Button>
              }
            />
          )}
        </Skeleton>
      </Card>
    </>
  );
};

export default PostDetailPage;
