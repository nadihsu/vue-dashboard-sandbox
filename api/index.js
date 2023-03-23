const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');

const app = new Koa();
const router = new Router({ prefix: '/api' });

let userId = 1;
let users = [];

function convert(day) {
  return day < 10 ? `0${day.toString()}` : day.toString();
}

function withLeadingZeros(num) {
  return num.length > 2 ? num : String(num).padStart(2, '0');
}

for (let i = 0; i < 50; i++) {
  users.push({
    id: userId,
    username: `user${userId}`,
    enable: (Math.random() * 10) & 1,
    locked: (Math.random() * 10) & 1,
    created_at: `2019-01-${convert(Number.parseInt(Math.random() * 25 + 1))}T${withLeadingZeros(Number.parseInt(Math.random() * 20))}:00:00+08:00`,
  });

  userId++;
}

router.get('/users', (ctx) => {
  const {
    username,
    enable,
    locked,
    start_created_at: startCreatedAt,
    end_created_at: endCreatedAt,
    first_result: firstResult = 0,
    max_results: maxResults = 20,
  } = ctx.query;

  const ret = users
    .filter((u) => !username || u.username.includes(username))
    .filter((u) => !enable || u.enable.toString() === enable.toString())
    .filter((u) => !locked || u.locked.toString() === locked.toString())
    .filter(
      (u) => !(startCreatedAt && endCreatedAt)
        || (u.created_at >= startCreatedAt && u.created_at <= endCreatedAt),
    );

  const pagination = {
    first_result: firstResult,
    max_results: maxResults,
    total: ret.length,
  };

  ctx.body = {
    result: 'ok',
    ret: ret.slice(parseInt(firstResult), parseInt(firstResult) + parseInt(maxResults)),
    pagination,
  };
});

router.post('/user', (ctx) => {
  const { username, enable, locked } = ctx.request.body;

  const user = {
    id: userId++,
    username,
    enable,
    locked,
    created_at: new Date().toISOString(),
  };

  users.push(user);

  ctx.body = {
    result: 'ok',
    ret: user,
  };
});

router.delete('/user/:id(\\d+)', (ctx) => {
  const { id } = ctx.params;

  users = users.filter((u) => u.id != id);

  ctx.body = {
    result: 'ok',
  };
});

router.put('/user/:id(\\d+)', (ctx) => {
  const { id } = ctx.params;
  const { username, enable, locked } = ctx.request.body;

  const user = users.find((u) => u.id == id);

  if (username !== undefined) {
    user.username = username;
  }

  if (enable !== undefined) {
    user.enable = enable;
  }

  if (locked !== undefined) {
    user.locked = locked;
  }

  ctx.body = {
    result: 'ok',
    ret: user,
  };
});

app.on('error', (err, ctx) => {
  console.error('server error', err, ctx);
});

app
  .use(cors())
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(9988);
