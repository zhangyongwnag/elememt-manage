/**
 * @description 打包后抽取的配置 BaseUrl必须是host地址 + 端口号
 */

(function () {
    let win = typeof window == 'undefined' ? global : window
    win.Glob = {
        BASE_URL: '172.16.0.223/api2'
    }
})()
