/**
 * @date 2019/12/17
 * @author zyw
 * @description 封装websocket
 * @return new WBT()
 * @callback {
 *   open(callback) // 建立连接
 *   close(callback) // 关闭连接
 *   watch(callback) // 服务端推送消息
 *   error(callback) // websocket报错
 *   send(callback) // 客户端向服务端发送消息
 * }
 */
let WBT = function (obj = {}) {
    let host
    if (process.env.NODE_ENV !== 'production'){
        host =  ''
    }else {
        host = ''
    }
    const protocol = 'ws://'
    //接口地址url
    this.url = protocol + host + '/sdm/websocket/' + parseInt(Math.random() * 10000)

    //socket对象
    this.socket//心跳状态  为false时不能执行操作 等待重连
    this.isHeartflag = false
    //重连状态  避免不间断的重连操作
    this.isReconnect = false

    //自定义Ws连接函数：服务器连接成功
    this.open = fun => {
        if (!this.socket) {
            this.initWs()
            this.isHeartflag = false
            this.isReconnect = false
        }

        if (this.isHeartflag) {
            // console.log('WebSocket日志： 已连接')
            if (fun && Object.prototype.toString.call(fun) === '[object Function]') {
                fun({})
            }
            return
        }
        this.socket.onopen = e => {
            this.isHeartflag = true
            // console.log('WebSocket日志： 连接成功')
            if (fun && Object.prototype.toString.call(fun) === '[object Function]') {
                fun(e)
            }
        }
    }

    //自定义Ws关闭事件：Ws连接关闭后触发
    this.close = ((fun) => {
        this.socket.onclose = function (e) {
            // console.log('WebSocket日志： 连接关闭')
            this.isHeartflag = false
            this.isReconnect = false
            this.socket = null
            if (fun && Object.prototype.toString.call(fun) === '[object Function]') {
                fun(e)
            }
        }
    })

    //自定义Ws消息接收函数：服务器向前端推送消息时触发
    this.watch = ((fun) => {
        this.socket.onmessage = function (e) {
            // console.log('WebSocket日志： 收到服务器推送消息')
            if (fun && Object.prototype.toString.call(fun) === '[object Function]') {
                fun(e)
            }
        }
    })

    //自定义Ws异常事件：Ws报错后触发
    this.error = ((e) => {
        // console.log('WebSocket日志： 连接发生错误')
        this.isHeartflag = false
        this.reConnect()
    })

    //自定义Ws发送事件：Ws发送消息
    this.send = ((msg) => {
        if (this.socket) {
            if (!this.isHeartflag) {
                // console.error('WebSocket日志： 发送失败,连接已中断')
            } else {
                // console.log('WebSocket日志： 发送消息')
                this.socket.send(msg)
            }
        } else {
            // console.error('WebSocket日志： 发送失败,连接已中断')
        }
    })

    // 初始化建立连接
    this.initWs()
}

//初始化websocket连接
WBT.prototype.initWs = function () {
    // 检测浏览器支持
    window.WebSocket = window.WebSocket || window.MozWebSocket
    if (!window.WebSocket) {
        // console.error('错误: 浏览器不支持websocket')
        return
    }

    // 创建连接并注册响应函数
    this.socket = new WebSocket(this.url)

    this.socket.onerror = ((e) => {
        this.error(e)
    })

    //检测服务器端  关闭连接
    this.socket.onclose = ((e) => {
        this.isHeartflag = false
        this.isReconnect = false
        this.socket = null
        // console.log('WebSocket日志： 连接关闭(非主动关闭)')
    })
}

WBT.prototype.reConnect = function () {
    if (this.isReconnect) return
    // console.log('WebSocket日志： 重新连接')
    this.isReconnect = true
    //没连接上会一直重连，设置延迟避免请求过多
    setTimeout(() => {
        this.initWs()
        this.isReconnect = false
    }, 2000)
}

export default new WBT() // 暴露实例
