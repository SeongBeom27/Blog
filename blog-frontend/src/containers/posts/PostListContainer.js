import React, { useEffect } from 'react';
import qs from 'qs';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PostList from '../../components/posts/PostList';
import { listPosts } from '../../modules/posts';

const PostListContainer = ({ location }) => {
  const dispatch = useDispatch();
  const { posts, error, loading, user } = useSelector(
    ({ posts, loading, user }) => ({
      posts: posts.posts,
      error: posts.error,
      loading: loading['posts/LIST_POSTS'],
      user: user.user,
    }),
  );

  useEffect(() => {
    const { tag, page, username } = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    });
    // listPosts API 호출
    dispatch(listPosts({ tag, username, page }));
  }, [dispatch, location.search]);

  // showWriteButton을 user 객체로 지정해줌으로써 user 객체가 유효할 경우에만, 즉 사용자가 로그인 중일 때만 포스트를 작성하는 버튼이 나타난다
  return (
    <PostList
      loading={loading}
      error={error}
      posts={posts}
      showWriteButton={user}
    ></PostList>
  );
};

export default withRouter(PostListContainer);
