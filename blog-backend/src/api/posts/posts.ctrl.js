import Post from '../../models/post';
import mongoose from 'mongoose';
import Joi from 'joi';

const { ObjectId } = mongoose.Types;

// ObjectId 검증
export const CheckObjectId = (ctx, next) => {
  const { id } = ctx.params;
  if (!ObjectId.isValid(id)) {
    ctx.status = 400;
    return;
  }
  return next();
};

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
  const schema = Joi.object().keys({
    // 객체가 다음 필드를 가지고 있음을 검증
    title: Joi.string().required(), // required가 있으면 필수항목
    body: Joi.string().required(),
    tags: Joi.array().items(Joi.string()).required(),
  });

  const result = schema.validate(ctx.request.body);
  if (result.error) {
    ctx.status = 400; // Bad Request
    ctx.body = result.error;
    return;
  }

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
export const list = async (ctx) => {
  // query는 문자열이기 때문에 숫자로 변환 작업이 필요함
  // 값이 주어지지 않았다면 1을 기본적으로 사용한다
  const page = parseInt(ctx.query.page || '1', 10);

  if (page < 1) {
    ctx.status = 400;
    return;
  }

  try {
    // find 호출 뒤 exec까지 호출해야 쿼리 요청이 된다.
    // sort : key는 정렬할 필드를 설정하는 부분이며 1이면 오름차순 -1이면 내림차순
    // limit : 한 번에 보이는 포스트의 최대 개수를 제한한다
    const posts = await Post.find()
      .sort({ _id: -1 })
      .limit(10)
      .skip((page - 1) * 10)
      .exec();
    const postCount = await Post.countDocuments().exec();
    ctx.set('Last-Page', Math.ceil(postCount / 10));
    ctx.body = posts
      .map((post) => post.toJSON())
      .map((post) => ({
        ...post,
        body:
          post.body.length < 200 ? post.body : `${post.body.slice(0, 200)}...`,
      }));
  } catch (e) {
    ctx.throw(500, e);
  }
};

/**
 * 특정 포스트 조회
 * GET /api/posts/:id
 */
export const read = async (ctx) => {
  const { id } = ctx.params;
  try {
    const post = await Post.findById(id).exec();
    if (!post) {
      ctx.status = 404; // not found
      return;
    }
    ctx.body = post;
  } catch (e) {
    ctx.throw(500, e);
  }
};

/**
 * 특정 포스트 제거
 * DELETE /api/posts/:id
 */
export const remove = async (ctx) => {
  /**
   * 데이터 삭제 함수
   *
   * remove : 특정 조건을 만족하는 데이터를 모두 지운다.
   * findByIdAndRemove : id를 찾아서 지운다.
   * findOneAndRemove : 특정 조건을 만족하는 데이터 하나를 찾아서 제거한다.
   */
  const { id } = ctx.params;
  try {
    await Post.findByIdAndRemove(id).exec();
    ctx.status = 204; // No Content (성공하기는 했지만 응답할 데이터는 없음)
  } catch (e) {
    ctx.throw(500, e);
  }
};

/**
 * 포스트 수정 (특정 필드 변경)
 * PATCH /api/posts/:id
 * {
 *    title: '수정'
 *    body:  '수정 내용'
 *    tags:   ['수정','태그']
 * }
 */
export const update = async (ctx) => {
  const { id } = ctx.params;
  try {
    const post = await Post.findByIdAndUpdate(id, ctx.request.body, {
      new: true, // 이 값을 설정하면 업데이트된 데이터를 반환한다.
      // false일 때는 업데이트되기 전의 데이터를 반환한다
    }).exec();
    if (!post) {
      ctx.status = 404;
      return;
    }
  } catch (e) {
    ctx.throw(500, e);
  }
};
