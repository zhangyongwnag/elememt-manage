<template>
    <div>
        <section v-if="type == 1 || type == 5">
            <div class="common_select" style="margin-top: -5px">
                <el-form>
                    <el-form-item :label="select_title || ''">
                        <el-select placeholder="请选择" v-model="model">
                            <el-option
                                v-for='item in list'
                                :key='item.contentMeaning'
                                :label='item.content'
                                :value='item.contentMeaning'>
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>
        </section>
        <section v-if="type == '2'">
            <el-form>
                <div class="common_flex_align_center" style="margin-top: -3px">
                    <div style="margin-right: 10px">{{inputObj.title || ''}}</div>
                    <input v-model="model" :placeholder="item.placeholder || '请填写'"
                           v-for="(item,index) in inputObj.list" style="width:150px"></input>
                </div>
            </el-form>
        </section>
        <section v-if="type == '3'">

        </section>
        <section v-if="type == '4'">
            <el-form>
                <el-form-item>
                    <el-checkbox-group v-model="model" v-if="list.length == 1">
                        <el-checkbox label="1" v-for="(item,index) in list" :key="index">{{item.content}}</el-checkbox>
                    </el-checkbox-group>
                    <el-radio-group v-model="model" v-if="list.length > 1">
                        <el-radio :label="item.contentMeaning" v-for="(item,index) in list" :key="index">
                            {{item.content}}
                        </el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
        </section>
    </div>
</template>

<script>
    /**
     * @date 2019/12/25
     * @author zyw
     * @description 脱敏算法规则管理
     * @params {
     *   type: {
     *     1 select:下拉选择框
     *     2 input:  填值类型
     *     3 date: 日期选择
     *     4 checkbox: 复选框
     *   },
     *   title: 如果 2 3 默认placeholder
     *   select_title: 如果存在 则为特殊select带title
     *   list:数据
     *   object:数据
     * }
     * @return {
     *
     * }
     */
    import headerTab from '@/components/common/Header_tab'
    import * as config from '@/config'
    import * as common from '@/common'

    export default {
        props: {
            value: {
                require: true,
                default () {

                }
            },
            id: '',
            methodId: '',
            key_sole: {
                type: String,
                default: ''
            },
            type: {
                type: Number,
                default: 0
            },
            title: {
                type: String,
                default: ''
            },
            list: {
                type: Array,
                default: () => {
                    []
                }
            },
            // object:{
            //   type:Object,
            //   default:{}
            // },
            select_title: {
                type: String,
                default: ''
            }
        },
        data () {
            return {
                result: '',
                checkResult: [], // 单选多选结果
                inputObj: {
                    title: '',
                    list: []
                },
            }
        },
        watch: {
            // result: {
            //     handler(v) {
            //         if (v || v == 0) {
            //             let data = [this.id, this.key_sole, v]
            //             this.$emit('change', data)
            //         }
            //     },
            //     immediate: false
            // },
            // checkResult: {
            //     handler(v) {
            //         if (v || v == 0) {
            //             let data = [this.id, this.key_sole, this.list.length == 1 ? v.join(',') : v]
            //             this.$emit('change', data)
            //         }
            //     },
            //     immediate: false
            // },
            title: {
                async handler (v) {
                    if (v && v != 'NONE') {
                        let index$ = []
                        let indexV = []
                        let value = v.split('')
                        await value.map((item, index) => {
                            if (item == '$') {
                                index$.push(index)
                            } else if (item == '}') {
                                indexV.push(index)
                            }
                        })
                        index$ ? this.inputObj.title = v.substring(0, index$[0]) : ''
                        index$.map((item, index) => {
                            indexV.map((n, i) => {
                                if (index == i) {
                                    let obj = {
                                        placeholder: v.substring(item + 2, n),
                                        value: ''
                                    }
                                    this.inputObj.list.push(obj)
                                }
                            })
                        })
                    }
                },
                immediate: true
            },
            // 'inputObj.list': {
            //     handler(v) {
            //         if (v.length) {
            //             if (v.length == 1) {
            //                 let data = [this.id, this.key_sole, v[0].value]
            //                 this.$emit('change', data)
            //             } else {
            //                 let value = []
            //                 v.map(item => value.push(item.value))
            //                 let data = [this.id, this.key_sole, `(${value.join(',')})`]
            //                 this.$emit('change', data)
            //             }
            //         }
            //     },
            //     deep: true,
            //     immediate: false
            // }
        },
        computed: {
            // 重写model
            model: {
                get () {
                    // 存在为0的情况 请注意
                    return this.value
                    // 赋值
                },
                set (value) {
                    let data = []
                    switch (this.type) {
                        case 1:
                            data = [this.id, this.methodId, this.key_sole, value]
                            this.$emit('change', data)
                            break
                        case 2:
                            data = [this.id, this.methodId, this.key_sole, value]
                            this.$emit('change', data)
                            break
                        case 3:
                            data = [this.id, this.methodId, this.key_sole, value]
                            break
                        case 4:
                            data = [this.id, this.methodId, this.key_sole, value]
                            this.$emit('change', data)
                            break
                        case 5:
                            data = [this.id, this.methodId, this.key_sole, value]
                            this.$emit('change', data)
                            break
                    }
                }
            }
        },
        created () {

        },
        mounted () {

        },
        methods: {},
        components: {}
    }
</script>

<style scoped>
    section {
        margin-right: 15px;
    }
</style>
