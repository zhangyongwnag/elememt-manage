<template>
    <div style="height: 100vh;overflow:hidden">
        <div class="layout_header">
            <div class="layout_header_logo">
                <img
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAbCAYAAADyBeakAAAAAXNSR0IArs4c6QAAAxtJREFUSA2tlktIVVEUhjuaryzKqKhAsqhJElaWPQcWVBg0iKSxCdUgalSDJtGgqEmRBE2EBoE2EIKSQqQkg26J2FMqIxKiFLmUSqWk2O377Rzb59x7zyPvDx9rP9Zee9991lnnWjNCKpFILMB1N2yBNVAC82A2jEAcPsBb6IA2y7IGsNMTG2fBAWiFCYgi+T+CWsj5r5OwcA+8gUyolyCH0h3E8k7grFNfguPeOfo90A7PocBGjyMP8mG+bQuxenxlkAWOGmgc5jGNOgNJlgMUgK7e1Hc6l2ErHIM2+AlBGsPhcwqnLsYWJm2uASZy4L5nUQP9MrgOI5656XSfsjg5Txg8b0Ttp62cOAKDxngmm2ddt0Hk7eBk/yvapdACUTSKsxJZ6z+FWDiEj/Lpr+joOUs9sAp0XWH0HqfTsBqynXiy9OdCDehQ6bSLCUvOK+E36Jco2C0I0g8cjoJrY/MQThuffLgDqaTHXalDXLBnT2JVWIKkfCl1Nglj8V8Eelu8Ut5d1CEewgAUQdCz/IXP+jAbe31Y9wJMjdNZAi0qJMuhHvZCMfjpCoXmmZ+Dz5yKl6kmOrmwQTehX6e34wb4SXmzzIwSts26Ck/gr/SLoRqGdIg+yIXX4KePYTc1/Qio2J1GYFXbSvlgm+GbGq32gE7np075RRHB9JreNYJ2055MaqwqsfREhzijwNigyvgl7AGINQdUP5wf9pK23rzJUo3Ngw6Q6mYSOEZDX9NB0J+UdFqKXzmJ2ZXOgfkVzO2EclC8ExBjTS/W1DU6FfZAo24gG/T1DFOkHuCX9Pk3o/u1WasbaARH7jeN0RpnJsDWM68bjCTWbAYzQfW2bXMFYUC3EYcwUuGpAt+yzbxK9j5oAq+uOgdwXS1e1UyoiIRVP44x6IZhGIMiKLHZhP33paRjqxm7n1yZcAZcloPUeY+c4f5t4s1ybZqqg9M50DPLpPStOAWu20+1/9QYzjtAxSUTUmVcNxU8SoOFen0PQjtEvZlh1twE1Qxfhb4agi0mUhVshLWgvpKwEOKgJO2Dd3APHpN449hA/QHiNFsC0qQjpQAAAABJRU5ErkJggg=="
                    alt="">
                <span>编辑系统</span>
            </div>
            <div class="layout_header_content">
                <img src="../../assets/images/common/common_user1.png" alt="">
                <el-dropdown style="color:#fff">
          <span class="el-dropdown-link">
            用户名&nbsp;<i class="el-icon-caret-bottom" style="color:rgba(255,255,255,0.9)"></i>
          </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>事件</el-dropdown-item>
                        <el-dropdown-item>事件</el-dropdown-item>
                        <el-dropdown-item>事件</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <div class="layout_header_logout">
                    <img src="../../assets/images/common/common_quit.png" alt="">
                    退出系统
                </div>
            </div>
        </div>
        <el-container style="height: 100vh" class="main">
            <el-aside v-model="collapsed" class="left-sider"
                      :style="{overflow: 'hidden',width:menuStatus ? '64px' : '220px'}">
                <div style="margin: 12px 0 10px 26px;color: #9fb7d0;font-size:12px">菜单栏</div>
                <div class="scrollWrap" style="overflow: auto;overflow-x: hidden;height:calc(100% - 150px)">
                    <side-menu accordion ref="sideMenu" :active-name="$route.name" :collapsed="collapsed"
                               @on-select="turnToPage" :menu-list="menuList" :menuStatus="menuStatus">
                    </side-menu>
                </div>
                <div class="control" @click="control" :style="menuStatus ? {width:'63px'} : {width:'220px'}">
                    <i class="el-icon-s-unfold" v-if="menuStatus"></i>
                    <i class="el-icon-s-fold" v-else></i>
                </div>
            </el-aside>
            <el-container>
                <div class="main-content-con" style="padding: 0">
                    <div class="main-layout-con">
                        <!--tabs页签-->
                        <!--            <div class="tag-nav-wrapper">-->
                        <!--              <tags-nav :value="$route" @input="handleClick" :list="tagNavList" @on-close="handleCloseTag"/>-->
                        <!--            </div>-->
                        <!--面包屑页签-->
                        <div class="breadcrumb-wrapper">
                            <HeaderBar/>
                        </div>
                        <div class="content-wrapper">
                            <div class="content">
                                <keep-alive :include="cacheList">
                                    <router-view/>
                                </keep-alive>
                            </div>
                            <ABackTop :height="100" :bottom="80" :right="50" container=".content-wrapper"></ABackTop>
                        </div>
                    </div>
                </div>
            </el-container>
        </el-container>
    </div>
</template>
<script>
    import SideMenu from './components/side-menu/side-menu.vue'
    import HeaderBar from './components/header-bar/header-bar.vue'
    import TagsNav from './components/tags-nav/tags-nav.vue'
    import User from './components/user/user.vue'
    import ABackTop from './components/a-back-top/index.vue'
    import {mapMutations, mapActions, mapGetters} from 'vuex'
    import {getNewTagList, routeEqual} from '@/libs/util'
    import routers from '@/router/routers'

    export default {
        name: 'Main',
        components: {
            SideMenu,
            HeaderBar,
            TagsNav,
            User,
            ABackTop
        },
        data () {
            return {
                collapsed: false,
                isFullscreen: false,
                menuStatus: false,
            }
        },
        computed: {
            ...mapGetters([
                'errorCount'
            ]),
            tagNavList () {
                return this.$store.state.app.tagNavList
            },
            tagRouter () {
                return this.$store.state.app.tagRouter
            },
            cacheList () {
                const list = ['ParentView', ...this.tagNavList.length ? this.tagNavList.filter(item => !(item.meta && item.meta.notCache)).map(item => item.name) : []]
                return list
            },
            menuList () {
                return this.$store.getters.menuList
            },
            local () {
                return this.$store.state.app.local
            },
            hasReadErrorPage () {
                return this.$store.state.app.hasReadErrorPage
            },
//    unreadCount () {
////      return this.$store.state.user.unreadCount
//    }
        },
        methods: {
            ...mapMutations([
                'setBreadCrumb',
                'setTagNavList',
                'addTag',
                'setLocal',
                'setHomeRoute',
                'closeTag'
            ]),
            ...mapActions([
                'handleLogin',
                'getUnreadMessageCount'
            ]),
            turnToPage (route) {
                let {name, params, query} = {}
                if (typeof route === 'string') {
                    name = route
                } else {
                    name = route.name
                    params = route.params
                    query = route.query
                }
                if (name.indexOf('isTurnByHref_') > -1) {
                    window.open(name.split('_')[1])
                    return
                }
                this.$router.push({
                    name,
                    params,
                    query
                })
            },
            handleCollapsedChange (state) {
                this.collapsed = state
            },
            handleCloseTag (res, type, route) {
                if (type !== 'others') {
                    if (type === 'all') {
                        this.turnToPage('Home')
                    } else {
                        if (routeEqual(this.$route, route)) {
                            this.closeTag(route)
                        }
                    }
                }
                this.setTagNavList(res)
            },
            handleClick (item) {
                this.turnToPage(item)
            },
            control () {
                this.menuStatus = !this.menuStatus
            }
        },
        watch: {
            '$route' (newRoute) {
                const {name, query, params, meta} = newRoute
                this.addTag({
                    route: {name, query, params, meta},
                    type: 'push'
                })
                this.setBreadCrumb(newRoute)
                this.setTagNavList(getNewTagList(this.tagNavList, newRoute))
                this.$refs.sideMenu.updateOpenName(newRoute.name)
            }
        },
        mounted () {
            /**
             * @description 初始化设置面包屑导航和标签导航
             */
            this.setTagNavList()
            this.setHomeRoute(routers)
            const {name, params, query, meta} = this.$route
            this.addTag({
                route: {name, params, query, meta}
            })
            this.setBreadCrumb(this.$route)
            // 设置初始语言
//    this.setLocal(this.$i18n.locale)
            // 如果当前打开页面不在标签栏中，跳到homeName页
            if (!this.tagNavList.find(item => item.name === this.$route.name)) {
                this.$router.push({
                    name: 'Home'
                })
            }
            // 获取未读消息条数
//    this.getUnreadMessageCount()
        }
    }
</script>
<style scoped>
    .layout_header {
        width: 100%;
        height: 50px;
        background-color: rgba(37, 104, 220, 1);
        background-image: url(../../assets/images/header_bg.png);
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #fff;
        padding: 0 12px 0 38px;
    }

    .layout_header_logo {
        display: flex;
        align-items: center;
    }

    .layout_header_logo img {
        width: 33px;
        height: 27px;
    }

    .layout_header_logo span {
        margin-left: 10px;
        font-size: 18px !important;
        font-weight: bold;
    }

    .layout_header_content {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .layout_header_content img {
        margin-right: 6px;
        width: 16px;
    }

    .layout_header_logout {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 14px;
        margin-left: 15px;
    }

    .layout_header_logout img {
        margin-right: 6px;
        width: 18px;
    }

    .main .logo-con {
        height: 64px;
        padding: 10px;
    }

    .main .logo-con img {
        height: 44px;
        width: auto;
        display: block;
        margin: 0 auto;
    }

    .main .header-con {
        background: #fff;
        padding: 0 20px;
        width: 100%;
    }

    .main .main-layout-con {
        height: 100%;
        overflow: hidden;
    }

    .main .main-content-con {
        width: 100%;
        height: calc(100% - 50px);
        overflow: hidden;
    }

    .main .tag-nav-wrapper {
        width: 100%;
        padding: 0;
        height: 40px;
        background: #F0F0F0;
    }

    .main .breadcrumb-wrapper {
        width: 100%;
        height: 40px;
        background-color: #fff;
        padding: 0;
    }

    .main .content-wrapper {
        background-color: #eef7ff;
        padding: 13px 13px 0;
        box-sizing: border-box;
        height: 100%;
    }

    .main .content-wrapper .content {
        background-color: #FFF;
        border-radius: 5px;
        /*min-height: 100vh;*/
        height: 100%;
        overflow: auto;
    }

    /*网页内容体*/
    .main .content-wrapper .content::-webkit-scrollbar {
        width: 8px;
        height: 8px;
    }

    .main .content-wrapper .content::-webkit-scrollbar-thumb {
        border-radius: 10px;
        box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        background-color: #007aff;
    }

    .main .content-wrapper .content::-webkit-scrollbar-track {
        box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        border-radius: 10px;
        background-color: #fff;
    }

    .main .left-sider .ivu-layout-sider-children {
        overflow-y: scroll;
        margin-right: -18px;
    }

    .ivu-menu-item > i {
        margin-right: 12px !important;
    }

    .ivu-menu-submenu > .ivu-menu > .ivu-menu-item > i {
        margin-right: 8px !important;
    }

    .collased-menu-dropdown {
        width: 100%;
        margin: 0;
        line-height: normal;
        padding: 7px 0 6px 16px;
        clear: both;
        font-size: 12px !important;
        white-space: nowrap;
        list-style: none;
        cursor: pointer;
        transition: background 0.2s ease-in-out;
    }

    .collased-menu-dropdown:hover {
        background: rgba(100, 100, 100, 0.1);
    }

    .collased-menu-dropdown * {
        color: #515a6e;
    }

    .collased-menu-dropdown .ivu-menu-item > i {
        margin-right: 12px !important;
    }

    .collased-menu-dropdown .ivu-menu-submenu > .ivu-menu > .ivu-menu-item > i {
        margin-right: 8px !important;
    }

    .ivu-select-dropdown.ivu-dropdown-transfer {
        max-height: 400px;
    }

    .control {
        position: absolute;
        left: 0;
        bottom: 60px;
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-top: 1px #eee solid;
        transition: all 0.3s;
    }

    .control i {
        font-size: 24px;
    }

</style>
