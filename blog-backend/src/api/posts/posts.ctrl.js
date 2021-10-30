import Post from '../../models/post';

/**
 * 포스트 작성
 * POST /api/posts
 * {
 *    title: '제목',
 *    body:  '내용',
 *    tags: ['태그1', '태그2']
 * }
 */
export const write = async (ctx) => {
  const { title, body, tags } = ctx.request.body;
  const post = new Post({
    title,
    body,
    tags,
  });
  try {
    // async/await 문법으로 데이터베이스 저장 요청을 완료할 때 까지 대기
    // await를 사용하는 방법 다시 정리
    // 1. await를 사용하려는 함수 앞에 async키워드를 넣어야함
    // 2. await 는 try~catch 문을 사용해야함
    await post.save();
    ctx.body = post;
  } catch (e) {
    ctx.throw(500, e);
  }
};

/**
 * 포스트 목록 조회
 * GET /api/posts
 */
export const list = () => {};

/**
 * 특정 포스트 조회
 * GET /api/posts/:id
 */
export const read = () => {};

/**
 * 특정 포스트 제거
 * DELETE /api/posts/:id
 */
export const remove = () => {};

/**
 * 포스트 수정 (특정 필드 변경)
 * PATCH /api/posts/:id
 */
export const update = () => {};
