import request from '@/utils/request'
export function getMenus() {
  return request({
    url: '/menu/list',
    method: 'get'
  })
}

export function changePassword(data) {
  return request({
    url: '/password',
    method: 'post',
    data: {
      userNumber: data.userNumber,
      password: data.password,
      newPassword: data.newPassword
    }
  })
}
