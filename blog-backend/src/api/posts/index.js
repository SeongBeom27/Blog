const Rounter = require('koa-router');
import * as postsCtrl from './posts.ctrl';

const posts = new Rounter();

posts.get('/', postsCtrl.list);
posts.post('/', postsCtrl.write);
posts.get('/:id', postsCtrl.CheckObjectId, postsCtrl.read);
posts.delete('/:id', postsCtrl.CheckObjectId, postsCtrl.remove);
posts.patch('/:id', postsCtrl.CheckObjectId, postsCtrl.update);

module.exports = posts;
