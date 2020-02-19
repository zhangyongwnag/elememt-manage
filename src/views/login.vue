<template>
    <div class="wrap">
        <header class="common_flex hvr-shrink" style="padding-top: 50px;">
            <div class="logo common_flex">
                <img src="../assets/images/login/login_logo.png" alt="">
            </div>
            <div class="common_flex_negative" style="align-items: flex-start;margin: 10px 0 0 30px">
                <div class="description">XSecure-DBMasker SYSTEM</div>
                <div class="title">数据脱敏系统</div>
            </div>
        </header>
        <section class="common_flex">
            <div class="login" v-loading="loading">
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
        <div class="login_content">
            <!--            <section class="login_form">-->
            <!--                <div class="login_des">-->
            <!--                    <span class="left">用户登录</span>-->
            <!--                    <span class="right">Login User</span>-->
            <!--                </div>-->
            <!--                <el-form :model="ruleForm" :rules="rules" ref="ruleform" class="form_area">-->
            <!--                    <el-form-item prop="username" class="input_box">-->
            <!--                        <span class="icon_blue_bg"><i class="el-icon-user"></i></span>-->
            <!--                        <el-input class="login_input_item" type="text" v-model="ruleForm.username" placeholder="用户名" maxlength="20"></el-input>-->
            <!--                    </el-form-item>-->
            <!--                    <el-form-item prop="password" class="input_box">-->
            <!--                        <span class="icon_blue_bg"><i class="el-icon-lock"></i></span>-->
            <!--                        <el-input class="login_input_item" type="password" v-model="ruleForm.password" placeholder="密码" maxlength="20"></el-input>-->
            <!--                    </el-form-item>-->
            <!--                    <span class="code" @click="refreshCode"><img :src="initCodeImg" /></span>-->
            <!--                    <el-button @click="refreshCode" type="primary">获取验证码</el-button>-->
            <!--                    &lt;!&ndash; <el-button @click="regUser" type="primary">注册</el-button> &ndash;&gt;-->
            <!--                    &lt;!&ndash; <el-button @click="logout" type="primary">登出</el-button> &ndash;&gt;-->
            <!--                    <el-form-item prop="code" class="input_box">-->
            <!--                        <el-input type="text" v-model="ruleForm.code" placeholder="验证码" maxlength="4"></el-input>-->
            <!--                    </el-form-item>-->
            <!--                    <el-form-item><el-button class="login_submit" type="primary" @click="submitForm('ruleForm')">登 录</el-button></el-form-item>-->
            <!--                </el-form>-->
            <!--            </section>-->
        </div>
        <footer class="common_flex">
            <div class="hvr-float-shadow">版权所有&nbsp;:&nbsp;北京中安星云软件技术有限公司</div>
        </footer>
    </div>
</template>

<script>
    import * as config from '../config'
    import * as common from '../common'
    import m from '../md5.min'

    export default {
        name: 'Login',
        data () {
            return {
                loading: false,
                form: {
                    username: '',
                    password: '',
                    verifyCode: ''
                },
                verifyCodeInfo: {}
            }
        },
        computed: {
            loginButtonStatus () {
                if (this.form.username && this.form.password && this.form.verifyCode.length == 4) {
                    return true
                } else {
                    return false
                }
            }
        },
        created () {
            this._getVerifyCodeImg()

            // 监听键盘事件
            document.onkeydown = event => {
                let el = event || window.event || arguments.callee.caller.arguments[0]
                el.keyCode == 13 ? this.login() : ''
            }
        },
        destroyed () {
            document.onkeydown = null
        },
        methods: {
            // 登录
            login () {
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
                    passwd: m.md5(password),
                    imageId: this.verifyCodeInfo.imageId,
                    code: verifyCode
                }
                this.httpCli.post(config.URL_LOGIN, data)
                    .then(res => {
                        setTimeout(() => {
                            this.loading = false
                        }, 200)
                        if (res) {
                            // 登录成功
                            this.$router.replace({path: '/home'})
                            localStorage.setItem('token', res.data.tokens)
                        } else {
                            // 登录失败
                            setTimeout(() => {
                                this.form.verifyCode = ''
                            },500)
                            this._getVerifyCodeImg()
                        }
                    })
                    .catch(err => {
                        setTimeout(() => {
                            this.form.verifyCode = ''
                        },500)
                        this._getVerifyCodeImg()
                        this.loading = false
                    })
            },
            // 获取验证码
            _getVerifyCodeImg () {
                this.httpCli.get(config.URL_GET_VERIFY_CODE)
                    .then(res => {
                        if (res) {
                            res.data.image = 'data:image/png;base64,' + res.data.image
                            this.verifyCodeInfo = res.data
                            this.form.verifyCode = ''
                        }
                    })
            },
        },
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
        height: 50vh;
        background-image: url(../assets/images/login/login_bg.png);
        background-position: center;
        background-origin: unset;
        background-attachment: fixed;
        background-repeat: no-repeat;
    }

    .login {
        width: 431px;
        height: 81%;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0 3px 18px 0px rgba(0, 0, 0, 0.2);
        border-radius: 8px;
        margin-top: -4px;
        padding: 30px 40px;
        box-sizing: border-box;
        transition: all 0.3s;
    }

    .login_form {
        margin: 45px 0 0 -2.5px;
    }

    .login_form .login_form_item {
        width: calc(100% + 5px);
        margin-top: 30px;
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
