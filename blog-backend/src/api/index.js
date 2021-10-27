const Rounter = require('koa-router');
const posts = require('./posts');

const api = new Rounter();

api.use('/posts', posts.routes());

// 라우터를 내보냄
module.exports = api;
