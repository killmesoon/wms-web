const url = require('./url.js')
const data = require('./data.js')
module.exports = [
  {
    method: 'get',
    url: url.getMenuInfo,
    data: data.getMenuInfo
  },
  {
    method: 'post',
    url: url.changePassword,
    data: data.changePassword
  }
]
