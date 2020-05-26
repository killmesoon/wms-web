const getMenuInfo = {
  'code': 0,
  'data': [
    {
      'user': {
        'number': 'SA00000001',
        'name': '管理员',
        'loginName': 'eepsippr',
        'phone': '1523652542',
        'email': '',
        'authorities': [
          'ROLE_COMMON',
          'ROLE_MODULE_DEMO_USER',
          'ROLE_DEMO_ADMIN'
        ]
      },
      'routers': [
        {
          'children': [
            {
              'component': 'Display/mould1',
              'meta': {
                'code': '',
                'icon': '',
                'title': '模板1'
              },
              'name': 'Mould1',
              'path': 'mould1',
              'children': [
                {
                  'component': 'Display/mould1',
                  'meta': {
                    'code': '',
                    'icon': '',
                    'title': '模板1-1'
                  },
                  'name': 'Mould1-1',
                  'path': 'mould1-1'
                }
              ]
            },
            {
              'component': 'Display/mould2',
              'meta': {
                'code': '',
                'icon': '',
                'title': '模板2'
              },
              'name': 'Mould2',
              'path': 'mould2'
            }
          ],
          'component': 'Layout',
          'meta': {
            'code': '',
            'icon': '',
            'title': '展示级'
          },
          'name': 'Display',
          'path': '/',
          'redirect': '/mould1'
        }
      ]
    }
  ],
  'message': '操作成功!'
}

const changePassword = {
  'code': 0,
  'data': [],
  'message': '操作成功!'
}

module.exports = {
  getMenuInfo: getMenuInfo,
  changePassword: changePassword
}
