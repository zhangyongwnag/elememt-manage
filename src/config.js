let host = ''
if (process.env.NODE_ENV !== 'production'){
  host =  '/api'
}else {
    host = 'http://172.16.0.223:80'
}




