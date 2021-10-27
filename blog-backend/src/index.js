const Koa = require('koa');
const Rounter = require('koa-router');

const app = new Koa();
const rounter = new Rounter();

// 라우터 설정

/**
 * @param1    경로
 * @param2    라우터에 적용할 미들웨어 함수
 */
rounter.get('/', (ctx) => {
  ctx.body = '홈';
});

/**
 * 라우터 파라미터 설정 방법 => :name 형식으로 콜론을 사용하여 라우트 경로를 설정한다.
 * 또한 파라미터가 있을 수도 있고 없을 수도 있으면 :name?에 ?를 붙인다
 * 이렇게 설정한 파라미터는 함수의 ctx.params 객체에서 조회가 가능하다
 *
 *  URL 쿼리의 경우 다음과 같이 조회가 가능
 *  문자,정수 : ctx.query
 *  문자열 : ctx.querystring
 *
 *  test url : http://localhost:4000/about/react
 */
rounter.get('/about/:name?', (ctx) => {
  const { name } = ctx.params;
  // name의 존재 유무에 따라 다른 결과 출력
  ctx.body = name ? `${name}의 소개` : '소개';
});

// test url : http://localhost:4000/posts?id=10
rounter.get('/posts', (ctx) => {
  const { id } = ctx.query;

  // name의 존재 유무에 따라 다른 결과 출력
  ctx.body = id ? `${id}의 소개` : '포스트 아이디가 없습니다.';
});

// app 인스턴스에 라우터 적용
app.use(rounter.routes()).use(rounter.allowedMethods());

app.listen(4000, () => {
  console.log('Listening to port 4000');
});

// koa는 미들웨어의 배열로 구성되어 있다.
// app.use는 미들웨어 함수를 애플리케이션에 등록시켜준다.

// 미들웨어 함수의 구조
// (ctx, next) -> {
// }

// 미들웨어 함수는 두 개의 파라미터를 얻는다.
// ctx   : Context의 줄임말로
// next  : 현재 처리 중인 미들웨어의 다음 미들웨어를 호출하는 함수
