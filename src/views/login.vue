<template>
    <div class="wrap">
        <header class="common_flex hvr-shrink" style="padding-top: 2%;">
            <div class="logo common_flex" style="z-index: 1;">
                <img src="../assets/images/login/login_logo.png" alt="">
            </div>
            <div class="common_flex_negative" style="align-items: flex-start;margin: 10px 0 0 30px;z-index: 1;">
                <div class="description">XSecure-DBMasker SYSTEM</div>
                <div class="title">数据脱敏系统</div>
            </div>
        </header>
        <section class="common_flex">
            <div class="login" v-loading="loading" style="z-index: 1;">
                <div class="login_title">
                    <span>用户登录 &nbsp;&nbsp;</span>
                    <span>Login User</span>
                </div>
                <div class="login_form">
                    <el-form :model="form">
                        <el-form-item class="login_form_item">
                            <div class="common_flex_align_center">
                                <span class="login_form_item_icon"><i class="el-icon-user"></i></span>
                                <input v-model.trim="form.username" placeholder="用户名"
                                       clearable></input>
                            </div>
                        </el-form-item>
                        <el-form-item class="login_form_item">
                            <div class="common_flex_align_center">
                                <span class="login_form_item_icon"><i class="el-icon-lock"></i></span>
                                <input type="password" v-model.trim="form.password" placeholder="密码"></input>
                            </div>
                        </el-form-item>
                        <el-form-item class="login_form_item">
                            <div class="common_flex_justify_space_between">
                                <input type="text" v-model.trim="form.verifyCode" placeholder="验证码"
                                       maxlength="4" style="width: 62%;margin: 0 10px 0 0px;"></input>
                                <div class="verifyCode" @click="_getVerifyCodeImg">
                                    <img :src="verifyCodeInfo.image" alt="">
                                </div>
                            </div>
                        </el-form-item>
                        <el-form-item>
                            <div @click='login' class="login_button login_button_allow hvr-glow"
                                 :class="loginButtonStatus ? 'login_before_allow' : ''" v-waves
                                 v-if="loginButtonStatus">登&nbsp;&nbsp;录
                            </div>
                            <div @click='login'
                                 class="login_button login_button_not_allow hvr-glow hvr-shutter-in-vertical" v-else>登&nbsp;&nbsp;录
                            </div>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </section>
        <footer class="common_flex">
            <div class="hvr-float-shadow" style="z-index: 1;">版权所有&nbsp;:&nbsp;111</div>
        </footer>

        <!--        <particlesJS style="position: absolute;left: 0;top: 0;width: 100%;height: 100%"/>-->
    </div>
</template>

<script>
  import * as config from '../../config'
  import * as common from '../common'
  import encryption from '../libs/encryption'
  import particlesJS from '../components/ParticlesJS'

  export default {
    name: 'Login',
    data() {
      return {
        loading: false,
        form: {
          username: 'system',
          password: '123123123',
          verifyCode: '1234'
        },
        verifyCodeInfo: {}
      }
    },
    computed: {
      loginButtonStatus() {
        if (this.form.username && this.form.password && this.form.verifyCode.length == 4) {
          return true
        } else {
          return false
        }
      }
    },
    created() {
      this._getVerifyCodeImg()

      // 如果token失效 传过来的userName
      if (this.$route.query.userName){
        this.form.username = this.$route.query.userName
      }
      localStorage.removeItem('userInfo')

      // 监听键盘事件
      document.onkeydown = event => {
        let el = event || window.event || arguments.callee.caller.arguments[0]
        el.keyCode == 13 ? this.login() : ''
      }
    },
    destroyed() {
      document.onkeydown = null
    },
    methods: {
      // 登录
      login() {
        let {username, password, verifyCode} = this.form
        if (!username) {
          this.$message.info(`请输入用户名`)
          return
        }
        if (!password) {
          this.$message.info(`请输入密码`)
          return
        }
        if (!verifyCode) {
          this.$message.info(`请输入验证码`)
          return
        }
        if (verifyCode.length != 4) {
          this.$message.warning(`请输入正确的验证码`)
          return
        }
        this.loading = true
        let data = {
          username,
          passwd: encryption.encrypt(password),
          // passwd: password,
          imageId: this.verifyCodeInfo.imageId,
          code: verifyCode
        }
 /*       this.httpCli.post(config.URL_LOGIN, data)
          .then(res => {
            if (res) {
              // 登录成功
              this._success(res.data)
            } else {
              this.loading = false
              // 登录失败
              setTimeout(() => {
                this.form.verifyCode = ''
              }, 500)
              this._getVerifyCodeImg()
            }
          })
          .catch(err => {
            setTimeout(() => {
              this.form.verifyCode = ''
            }, 500)
            this._getVerifyCodeImg()
            this.loading = false
          })*/
 setTimeout(() => {
   this._success(
     {
       token:'1',
       modules:{},
     }
   )
 },1000)
      },
      // 获取验证码
      _getVerifyCodeImg() {

      },
      // 登录成功
      _success(data) {
        // 保存用户信息
        localStorage.setItem('userInfo', JSON.stringify(data))
        // 异步加载  // 权限过滤 // 开启socket
        let promise = [
          // this.$store.dispatch('getDBType'),
          // this.$store.dispatch('getSrcType'),
          // this.$store.dispatch('getChangeColumnType'),
          // this.$store.dispatch('getMaskTypeList'),
          // this.$store.dispatch('getFieldList'),
          // this.$store.dispatch('_open'),
          // this.$store.dispatch('_getAccessList', data.modules),
          // this.$store.dispatch('_asyncFilter')
        ]
        Promise.all(promise)
          .then(res => {
            // 跳转
            this.$router.replace({path: '/home'})
            setTimeout(() => {
              this.loading = false
            },1000)
          })
          .catch(err => {
            console.log(err)
          })
      }
    },
    components: {
      particlesJS
    }
  }
</script>

<style scoped>
    .wrap {
        height: 100vh;
        width: 100vw;
        overflow: hidden;
        box-sizing: border-box;
        user-select: none;
        -webkit-user-select: none;
        cursor: pointer;
        color: rgba(0, 0, 0, 0.8);
        position: relative;
    }

    header {
        height: 25vh;
        font-size: 20px;
    }

    .logo img {
        width: 122px;
        height: 101px;
    }

    .description {
        line-height: 1.5;
        font-size: 20px;
        text-shadow: 0px 0px 1px #999;
    }

    .title {
        line-height: 1.5;
        font-weight: bold;
        font-size: 36px;
        text-shadow: 0px 0px 1px #999;
    }

    section {
        height: 50%;
        background-image: url(../assets/images/login/login_bg.png);
        background-size: 100% 100%;
        background-position: center;
        background-origin: unset;
        /*background-attachment: fixed;*/
        background-repeat: no-repeat;
    }

    .login {
        width: 431px;
        max-height: 400px;
        height: 100%;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0 3px 18px 0px rgba(0, 0, 0, 0.2);
        border-radius: 8px;
        margin-top: -4px;
        padding: 30px 40px;
        box-sizing: border-box;
        transition: all 0.3s;
    }

    .login_form {
        margin: 5% 0 0 -2.5px;
    }

    .login_form .login_form_item {
        width: calc(100% + 5px);
        margin-top: 9.2%;
    }

    .login_form .login_form_item input {
        height: 35px !important;
        border-radius: 0px 3px 3px 0;
        margin-left: -5px;
        -webkit-appearance: none;
        background-color: #FFF;
        background-image: none;
        border: 1px solid #DCDFE6;
        -webkit-box-sizing: border-box;
        color: #606266;
        display: inline-block;
        font-size: inherit;
        line-height: 35px;
        outline: 0;
        padding: 0 15px;
        box-sizing: border-box;
        -webkit-transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
        transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
        width: 100%;
        font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif !important;
    }

    .login_form .login_form_item input:focus {
        border-color: #409EFF;
        outline: 0;
    }

    .login:focus-within {
        transform: translateY(-4px);
        /*border: 1px rgba(0,0,255,0.1) dashed;*/
        box-shadow: 4px 4px 20px 5px #ddd;
    }

    .login_form .login_form_item input::-webkit-input-placeholder {
        color: #C0C4CC
    }

    .login_form .login_form_item input:-ms-input-placeholder {
        color: #C0C4CC
    }

    .login_form .login_form_item input::-ms-input-placeholder {
        color: #C0C4CC
    }

    .login_form .login_form_item input::placeholder {
        color: #C0C4CC
    }

    .login_form_item_icon {
        width: 42px;
        height: 35px;
        line-height: 35px;
        text-align: center;
        background: rgba(0, 122, 255, 1);
        color: #fff;
        border-radius: 3px 0 0 3px;
        z-index: 2;
    }

    .login .login_title {
        white-space: nowrap;
        text-align: center;
        margin-left: -2.5px;
    }

    .login .login_title span:first-of-type {
        font-weight: bold;
        font-size: 20px;
        text-shadow: 0px 0px 1px #999;
    }

    .login .login_title span:last-of-type {
        font-size: 16px;
        color: rgba(0, 0, 0, 0.8);
        text-shadow: 0px 0px 2px #999;
    }

    .verifyCode {
        width: 30%;
        height: 35px;
    }

    .verifyCode img {
        width: 100%;
        height: 35px;
        border-radius: 2px;
        overflow: hidden;
    }

    .login_button {
        width: calc(100% + 5px);
        height: 32px;
        line-height: 32px;
        text-align: center;
        color: #fff;
        margin-top: 45px;
        border-radius: 3px;
        padding: 0px;
        overflow: hidden;
    }

    .login_button_allow {
        background-color: rgba(0, 122, 255, 1);
        -webkit-transform: perspective(1px) translateZ(0);
        transform: perspective(1px) translateZ(0);
        box-shadow: 0 0 1px rgba(0, 0, 0, 0);
        position: relative;
        -webkit-transition-property: color;
        transition-property: color;
        -webkit-transition-duration: 0.3s;
        transition-duration: 0.3s;
    }

    .login_button_not_allow {

    }

    .login_button_allow:before {
        content: "";
        position: absolute;
        z-index: -1;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        border-radius: 3px;
        background: #e1e1e1;
        -webkit-transform: scaleY(1);
        transform: scaleY(1);
        -webkit-transform-origin: 50%;
        transform-origin: 50%;
        -webkit-transition-property: transform;
        transition-property: transform;
        -webkit-transition-duration: 0.3s;
        transition-duration: 0.3s;
        -webkit-transition-timing-function: ease-out;
        transition-timing-function: ease-out;
    }

    footer {
        height: 25vh;
        font-size: 14px;
        color: #606266;
        text-shadow: 0px 0px 1px #999;
    }

    .login_before_allow:before {
        -webkit-transform: scaleY(0);
        transform: scaleY(0);
    }
</style>
