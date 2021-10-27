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

rounter.get('/about', (ctx) => {
  ctx.body = '소개';
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
