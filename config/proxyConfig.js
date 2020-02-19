module.exports = {
    proxyList: {
        '/api': {
            target: 'http://123.57.34.162:18080',
            // target: 'http://123.57.34.162:22322',
            changeOrigin: true,
            ws:true, // 如果是http不需要
            pathRewrite: {
                '^/api': ''
            }
        },
        '/v1': {
            target: 'http://172.16.0.21:8080',
            changeOrigin: true,
            ws:true, // 如果是http不需要
            pathRewrite: {
                '^/v1': ''
            }
        },
        '/v2':{
            target:'http://172.16.0.165:8080',
            changeOrigin:true,
            ws:true, // 如果是http不需要
            pathRewrite:{
                '^/v2':''
            }
        },
        '/v3':{
            target:'http://172.16.0.110:8080',
            changeOrigin:true,
            ws:true, // 如果是http不需要
            pathRewrite:{
                '^/v3':''
            }
        },
        '/v5':{
            target:'http://172.16.0.122:8080',
            changeOrigin:true,
            ws:true, // 如果是http不需要
            pathRewrite:{
                '^/v5':''
            }
        },
    }
}

