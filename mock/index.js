const Mock = require('mockjs');

const { Random } = Mock;
const listFormat = (req, json) => {
  const { page, size } = req.query;
  const menus = require(json);
  return {
    code: 200,
    data: {
      number: page,
      size: size,
      total: menus.length,
      content: menus.slice((page - 1) * size, page * size),
    },
  };
};
const proxy = {
  'POST /user/login': (req, res) => {
    const { username, password } = req.body;
    if (username === 'admin' && password === '123456') {
      return res.send({
        code: 200,
        msg: '',
        data: {
          id: Random.integer(10000),
          username: 'admin',
          password: '123456',
          menus: require('./json/menu.json'),
        },
      });
    } else {
      return res.send({
        code: 2001,
        msg: '密码或账号错误',
      });
    }
  },
  'GET /menu/list': (req, res) => {
    return res.send(listFormat(req, './json/menu.json'));
  },
  'GET /role/list': (req, res) => {
    return res.send(listFormat(req, './json/role.json'));
  },
  'GET /log/list': (req, res) => {
    return res.send(listFormat(req, './json/log.json'));
  },
  'GET /menu/tree': (req, res) => {
    const menus = require('./json/menu.json');
    return res.send({
      code: 200,
      data: menus,
    });
  },
};
module.exports = proxy;
