let host = ''
// 开发环境 npm run dev
if (process.env.NODE_ENV !== 'production') {
  host = '/api'
} else {
  // 测试环境 npm run test
  if (process.env.type == 'test'){
    host = 'http://' + window.Glob.BASE_URL
  }else { // 正式环境 npm run build
    host = 'http://172.16.0.223:80'
  }
}
