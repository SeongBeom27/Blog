const Rounter = require('koa-router');
const posts = new Rounter();

const printinfo = (ctx) => {
  ctx.body = {
    method: ctx.method,
    path: ctx.path,
    params: ctx.params,
  };
};

posts.get('/', printinfo);
posts.post('/', printinfo);
posts.get('/:id', printinfo);
posts.delete('/:id', printinfo);
posts.put('/:id', printinfo);
posts.patch('/:id', printinfo);

module.exports = posts;
