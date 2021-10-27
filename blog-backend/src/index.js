const Koa = require('koa');

const app = new Koa();

app.use((ctx, next) => {
  console.log(ctx.url);
  console.log(1);
  if (ctx.query.authorized !== '1') {
    ctx.status = 401;
    return;
  }
  next().then(() => {
    console.log('END');
  });
});

app.use((ctx, next) => {
  console.log(2);
  next();
});

app.use((ctx) => {
  ctx.body = 'hello world';
});

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