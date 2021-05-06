const Mock = require('mockjs');

const { Random } = Mock;
const listFormat = (req, json) => {
  const { page = 1, size = 10 } = req.method === 'GET' ? req.query : req.body;
  const menus = require(json);
  return {
    code: 10000,
    data: {
      page: page,
      size: size,
      totalpage: menus.length,
      list: menus.slice((page - 1) * size, page * size),
    },
  };
};
const proxy = {
  'POST /passport/login': (req, res) => {
    const { account, password, verifyCode } = req.body;
    if (
      (account === 'admin' && password === '123456') ||
      verifyCode === '1234'
    ) {
      return res.send({
        code: 10000,
        msg: '',
        data: {
          id: Random.integer(10000),
          account: 'admin',
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
  'POST /admin/specs/list': (req, res) => {
    return res.send(listFormat(req, './json/specification.json'));
  },
  'POST /goods/list': (req, res) => {
    return res.send(listFormat(req, './json/system-goods.json'));
  },
  'POST /admin/goods/specs/list': (req, res) => {
    return res.send(listFormat(req, './json/specification.json'));
  },
  'GET /menu/tree': (req, res) => {
    const menus = require('./json/menu.json');
    return res.send({
      code: 10000,
      data: menus,
    });
  },
  'POST /admin/specs/value/list': (req, res) => {
    const list = require('./json/getSpecsValList.json');
    return res.send({
      code: 10000,
      data: { list },
    });
  },
  'POST /admin/specs/delete': (req, res) => {
    const list = require('./json/getSpecsValList.json');
    return res.send({
      code: 10000,
      data: { list },
    });
  },
  'POST /admin/products/list': (req, res) => {
    return res.send(listFormat(req, './json/productsList.json'));
  },
  'POST /admin/brand/list': (req, res) => {
    return res.send(listFormat(req, './json/getBrandList.json'));
  },
  'POST /passport/get/logincode': (req, res) => {
    return res.send({
      code: 10000,
      data: null,
    });
  },
  'POST /passport/logout': (req, res) => {
    return res.send({
      code: 10000,
      data: null,
    });
  },
  'POST /sales-orders/list': (req, res) => {
    return res.send(listFormat(req, './json/sales-order-list.json'));
  },
};

module.exports = proxy;
