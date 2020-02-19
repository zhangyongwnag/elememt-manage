<template>
    <div class="common_flex_justify_space_between"
         style="height:100%;min-height: 100%;background-color: #eef7ff;">
        <div class="common_content_left">
            <div class="header_tab">
                <headerTab msg="角色管理"></headerTab>
                <el-button type="primary" v-waves @click="append" style="padding: 6px 16px;border-radius: 2px">添加</el-button>
            </div>
            <div class="common_nav common_flex" style="padding: 15px 0;border-bottom:1px #eee solid">
                <div class="common_search" style="width: 95%;margin-left: 8px">
                    <el-input aotucomplete show-word-limit @keyup.enter.native="search"
                              v-model.trim="searchValue"
                              placeholder='请输入搜索关键字' type='text'><i
                        class='el-icon-search el-input__icon common_search_icon'
                        slot='suffix' @click='search'></i>
                    </el-input>
                </div>
            </div>
            <div class="common_content" style="overflow: auto;height:calc(100vh - 185px)">
                <div class="table_content" style="margin-top: -6px">
                    <el-table
                        tooltip-effect="dark"
                        v-loading="loading_left"
                        style='width: 100%;'
                        :data="userList"
                        border
                        fit
                        height="calc(100vh - 295px)"
                        max-height="calc(100vh - 295px)"
                        header-cell-class-name="table-header-class"
                        cell-class-name="table-cell-class"
                    >
                        <el-table-column label='用户名称' show-overflow-tooltip>{{}}</el-table-column>
                        <el-table-column label='操作' show-overflow-tooltip>
                            <template slot-scope="scope">
                                <el-button v-waves @click='delete(scope.row.id,scope.$index)'
                                           class='common_action_button'
                                           icon='el-icon-delete'>删除
                                </el-button>
                            </template>
                        </el-table-column>
                        <template slot='empty'>
                            <img src="../../../assets/images/common/common_data_empty.png" alt="" width="100">
                            <div style="margin-top: -30px;">暂无数据</div>
                        </template>
                    </el-table>
                    <div class="common_pagination" style="margin-top: 10px">
                        <el-pagination
                            @current-change="changeCurrent"
                            :page-size="20"
                            :current-page="currentPage"
                            layout="total,prev,pager,next"
                            :total="total"
                        >
                        </el-pagination>
                    </div>
                </div>
            </div>
        </div>
        <div class="common_content_right">
            <div class="header_tab">
                <headerTab msg="角色信息"></headerTab>
            </div>
            <div class="common_content">
                <transition name="el-zoom-in-center">
                    <!--有数据-->
                    <div v-if="showTack" style="width: 60%;">
                        <el-form :model="form" label-position="left" label-width="90px" style="width:55%">
                            <el-form-item label="用户名">
                                <el-input v-model="form" autocomplete="off"
                                ></el-input>
                            </el-form-item>
                            <el-form-item label="数据源类型">
                                <el-select v-model="form" placeholder="请选择数据源类型">
                                    <el-option label="123" value="1"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="数据库类型">
                                <el-select v-model="form" placeholder="请选择数据源类型">
                                    <el-option label="123" value="1"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-form>
                        <div style="margin-top: 10px;border: 1px #eee solid;padding: 20px;border-radius: 5px">
                            <el-checkbox @change="">全选</el-checkbox>
                            <el-checkbox-group v-model="check" @change="" style="margin-top: 10px">
                                <el-checkbox>资源</el-checkbox>
                                <el-checkbox>资源</el-checkbox>
                                <el-checkbox>资源</el-checkbox>
                                <el-checkbox>资源</el-checkbox>
                                <el-checkbox>资源</el-checkbox>
                            </el-checkbox-group>
                        </div>
                    </div>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
    import headerTab from '@/components/common/Header_tab'
    import * as config from '../../../config'
    import * as common from '../../../common'
    import Vue from 'vue'
    import * as role from '../../../api/system/role'

    export default {
        data () {
            return {
                searchValue: '', // 搜索
                loading_left: false,
                userList: [], // user
                total: 0,
                currentPage: 1,
                showTack: false,
                loading_right: false,

                form: {},
                check:[]
            }
        },
        computed: {},
        created () {
            this._getUserList()
        },
        mounted () {

        },
        methods: {
            append () {

            },
            delete () {

            },
            search () {
                let data = {
                    name: this.searchValue,
                }
            },
            changeCurrent (v) {
                this.currentPage = v
                let apply = {
                    name: this.searchValue_tact,
                    offset: this.currentPage,
                    limit: 20
                }
            },
            // 获取结构数据列表
            _getUserList (data) {
                this.showTack = true
                // this.loading_left = true
                role.getUser()
                    .then(res => {
                        if (res){
                            setTimeout(() => {
                                this.table_loading = false
                            }, 200)
                            this.userList = res.data
                            this.total = res.totalCount
                            this.showTack = true
                        }
                    })
                    .catch(err => {
                        this.loading_left = false
                    })
            },
        },
        components: {
            headerTab
        }
    }
</script>

<style scoped>
    .el-select{
        width: 100%;
    }
</style>
