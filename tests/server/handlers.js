import { rest } from 'msw';

const handlers = [
  /**
   * 取得使用者清單
   */
  rest.get('/users', (req, res, ctx) => res(
    ctx.json({
      result: 'ok',
      ret: [
        {
          id: 1,
          username: 'user1',
          enable: 0,
          locked: 1,
          created_at: '2023-02-08T14:00:00+08:00',
        },
        {
          id: 2,
          username: 'user2',
          enable: 1,
          locked: 1,
          created_at: '2023-02-11T14:00:00+08:00',
        },
        {
          id: 3,
          username: 'user3',
          enable: 0,
          locked: 1,
          created_at: '2023-02-16T02:00:00+08:00',
        },
        {
          id: 4,
          username: 'user4',
          enable: 1,
          locked: 0,
          created_at: '2023-02-08T10:00:00+08:00',
        },
        {
          id: 5,
          username: 'user5',
          enable: 1,
          locked: 0,
          created_at: '2023-02-17T18:00:00+08:00',
        },
        {
          id: 6,
          username: 'user6',
          enable: 0,
          locked: 1,
          created_at: '2023-02-18T01:00:00+08:00',
        },
        {
          id: 7,
          username: 'user7',
          enable: 1,
          locked: 1,
          created_at: '2023-02-06T08:00:00+08:00',
        },
        {
          id: 8,
          username: 'user8',
          enable: 0,
          locked: 1,
          created_at: '2023-02-02T16:00:00+08:00',
        },
        {
          id: 9,
          username: 'user9',
          enable: 0,
          locked: 1,
          created_at: '2023-02-13T16:00:00+08:00',
        },
        {
          id: 10,
          username: 'user10',
          enable: 1,
          locked: 0,
          created_at: '2023-02-04T07:00:00+08:00',
        },
      ],
    }),
  )),
  /**
   * 新增使用者
   */
  rest.post('/user', (req, res, ctx) => res(
    ctx.json({
      result: 'ok',
      ret: {
        username: 'add_test',
        enable: 1,
        locked: 1,
        created_at: '2023-03-27T04:27:40.833Z',
      },
    }),
  )),
  /**
   * 編輯使用者
   */
  rest.put('/user/:id', (req, res, ctx) => res(
    ctx.json({
      result: 'ok',
      ret: {
        username: 'edit_user',
        enable: 0,
        locked: 0,
        created_at: '2023-02-17T18:00:00+08:00',
      },
    }),
  )),
  /**
   * 刪除使用者
   */
  rest.delete('/user/:id', (req, res, ctx) => res(
    ctx.json({
      result: 'ok',
    }),
  )),
];

export default handlers;
