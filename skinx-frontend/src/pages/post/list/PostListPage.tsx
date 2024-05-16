import { Post } from '@/types/post';
import React, { useEffect, useState } from 'react';
import { getPosts as postServiceGetPosts, getTags as postServiceGetTags } from '@/services/postService';
import { useDispatch, useSelector } from 'react-redux';
import { selectCount, selectPosts, selectTagOptions, setCount, setPosts, setTagOptions } from '../postSlice';
import styles from './PostListPage.module.css';
import { Avatar, Card, Cascader, Col, Empty, Flex, Form, Input, Pagination, PaginationProps, Row, Select, Skeleton, Tag, Tooltip, Typography } from 'antd';

import DOMPurify from 'dompurify';
import { getColorCodeFromText } from '@/utils/style';
import { formatDate } from '@/utils/format';
import TagOptionRender from '@/components/TagOptionRender';
import type { CascaderProps, SelectProps } from 'antd';
import { SortOption } from '@/types/sortoption.type';
import { useNavigate } from 'react-router-dom';

const { Meta } = Card;

const sortOptions: SortOption[] = [
  {
    value: 'createdAt',
    label: 'Date',
    children: [
      {
        value: 'ASC',
        label: 'Ascending',
      },
      {
        value: 'DESC',
        label: 'Descending',
      },
    ],
  },
  {
    value: 'title',
    label: 'Title',
    children: [
      {
        value: 'ASC',
        label: 'Ascending',
      },
      {
        value: 'DESC',
        label: 'Descending',
      },
    ],
  },
];
const PostListPage: React.FC = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [keywords, setKeywords] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>('createdAt');
  const [sortOrder, setSortOrder] = useState<'ASC' | 'DESC'>('DESC');
  const [totalText, setTotalText] = useState<string>('');
  const posts: Post[] | null = useSelector(selectPosts);
  const count: number = useSelector(selectCount);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const tagOptions: string[] = useSelector(selectTagOptions);
  const navigator = useNavigate();

  const filteredOptions = Array.isArray(tagOptions) ? tagOptions.filter((o) => !tags.includes(o)) : [];

  const getPosts = async () => {
    const { posts, count } = await postServiceGetPosts({ page: page, limit: limit, keywords: keywords, tags: tags, sortBy: sortBy, sortOrder: sortOrder });
    dispatch(setPosts(posts));
    dispatch(setCount(count));
  };

  const onChange: PaginationProps['onChange'] = (page, pageSize) => {
    setLimit(pageSize);
    setPage(page);
  };

  const onSelectedSort: CascaderProps<SortOption>['onChange'] = (value) => {
    if (value) {
      setSortBy(value[0]);
      setSortOrder(value[1] as 'ASC' | 'DESC');
    }
  };
  const generateTolalText = () => {
    const from = (page - 1) * limit + 1;
    const to = page * limit;
    setTotalText(`${from}-${to} of ${count} posts`);
  };

  const handleOnClickPost = (id: number) => {
    navigator(`/post/${id}`);
  };

  useEffect(() => {
    const getTags = async () => {
      const tags = await postServiceGetTags();
      dispatch(setTagOptions(tags));
    };
    getTags();
  }, []);

  useEffect(() => {
    setIsLoading(true);

    dispatch(setPosts([] as Post[]));
    dispatch(setCount(0));

    getPosts();
  }, [page, limit, keywords, tags, sortBy, sortOrder]);

  useEffect(() => {
    if (posts && posts.length > 0) {
      setIsLoading(false);
      generateTolalText();
    } else if (posts == null) {
      setIsLoading(false);
    }
  }, [posts]);
  return (
    <div>
      {isLoading}
      <Row>
        <Col md={18}>
          <Typography.Title level={2}>Posts</Typography.Title>
        </Col>
        <Col md={6}></Col>
      </Row>

      <Row className="mb-2">
        <Col xs={24} sm={24} md={12}>
          <Row className="mb-2">
            <Form.Item style={{ margin: '0px', width: '100%' }} label="Title">
              <Input
                placeholder="Title"
                value={keywords}
                style={{ width: '100%', minWidth: '200px' }}
                onChange={(e) => {
                  setKeywords(e.target.value);
                }}
              />
            </Form.Item>
          </Row>
          <Row className="mb-2">
            <Form.Item style={{ margin: '0px', width: '100%' }} label="Tags">
              <Select
                mode="multiple"
                allowClear
                tagRender={TagOptionRender}
                defaultValue={[]}
                value={tags}
                onChange={setTags}
                style={{ width: '100%', minWidth: '200px' }}
                options={Array.isArray(filteredOptions) ? (filteredOptions.map((tag) => ({ value: tag, label: tag })) as SelectProps['options']) : []}
                placeholder="Select tags"
              />
            </Form.Item>
          </Row>
        </Col>
        <Col xs={24} sm={24} md={12}>
          <Row className="justify-end mb-2">
            <Form.Item style={{ margin: '0px' }} label="Show">
              <Select defaultValue={limit} onChange={(value) => setLimit(value)} style={{ width: '100%' }}>
                <Select.Option value={10}>10 / page</Select.Option>
                <Select.Option value={20}>20 / page</Select.Option>
                <Select.Option value={50}>50 / page</Select.Option>
                <Select.Option value={100}>100 / page</Select.Option>
              </Select>
            </Form.Item>
          </Row>
          <Row className="justify-end mb-2">
            <Form.Item style={{ margin: '0px' }} label="Sort by">
              <Cascader allowClear={false} defaultValue={[sortBy!, sortOrder]} options={sortOptions} onChange={onSelectedSort} placeholder="Sort by" style={{ width: '100%' }} expandTrigger="hover" />
            </Form.Item>
          </Row>
        </Col>
      </Row>

      <Row className=" text-center place-content-center">
        <Col md={24} className="text-center place-content-center">
          <Pagination total={count} defaultCurrent={page} current={page} showSizeChanger={false} onChange={onChange} />
        </Col>
      </Row>
      <Row className="mb-1 text-center place-content-center">{totalText}</Row>

      {isLoading ? (
        <Row gutter={[16, 16]}>
          <Col md={8}>
            <Card>
              <Skeleton loading={isLoading} avatar paragraph={{ rows: 5 }} active></Skeleton>
            </Card>
          </Col>
          <Col md={8}>
            <Card>
              <Skeleton loading={isLoading} avatar paragraph={{ rows: 5 }} active></Skeleton>
            </Card>
          </Col>
          <Col md={8}>
            <Card>
              <Skeleton loading={isLoading} avatar paragraph={{ rows: 5 }} active></Skeleton>
            </Card>
          </Col>
        </Row>
      ) : (
        <Row gutter={[16, 16]} className={posts == null ? 'justify-center' : ''}>
          {posts ? (
            posts.map((post) => (
              <Col md={8} key={post.id}>
                <Card hoverable className={styles.post_card} onClick={() => handleOnClickPost(post.id)}>
                  <Meta
                    avatar={
                      <Tooltip title={post.createdBy} placement="top">
                        <Avatar size={'large'} style={{ backgroundColor: getColorCodeFromText(post.createdBy!) }}>
                          {post.createdBy ? post.createdBy[0] : null}
                        </Avatar>
                      </Tooltip>
                    }
                    title={post.title}
                    description={formatDate(post.createdAt!)}
                  />
                  <Typography.Paragraph style={{ marginTop: '1rem' }} ellipsis={{ rows: 3 }}>
                    <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }} />{' '}
                  </Typography.Paragraph>
                  <Flex gap="4px 0" wrap>
                    {post.tags
                      ? post.tags!.map((tag) => (
                          <Tag key={tag} color={getColorCodeFromText(tag)}>
                            {tag}
                          </Tag>
                        ))
                      : null}
                  </Flex>
                </Card>
              </Col>
            ))
          ) : posts == null ? (
            <Empty className="my-4" />
          ) : null}
        </Row>
      )}
    </div>
  );
};

export default PostListPage;
