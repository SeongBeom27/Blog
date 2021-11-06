const Rounter = require('koa-router');
const posts = require('./posts');
const auth = require('./auth');

const api = new Rounter();

api.use('/posts', posts.routes());
api.use('/auth', auth.routes());

// 라우터를 내보냄
module.exports = api;
