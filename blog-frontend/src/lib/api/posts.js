import client from './client';
import qs from 'qs';

export const writePost = ({ title, body, tags }) =>
  client.post('/api/posts', { title, body, tags });

export const readPost = (id) => client.get(`/api/posts/${id}`);

export const listPosts = ({ page, username, tag }) => {
  const queryString = qs.stringify({
    page,
    username,
    tag,
  });
  // listPosts API를 호출ㄹ 때 파라미터로 값을 넣어주면 /api/posts?username=seongbeom&page=2 와 같이 주소를 만들어서 호출하게 된다
  return client.get(`/api/posts?${queryString}`);
};
