<template>
    <p class="page_title" :style="borderStatus ? {borderBottom: 'border-bottom: 1px #eee solid;'} : {border:'0px'}">{{msg}}</p>
</template>

<script>
  /**
   * @date:2019/12/12
   * @description Header面包条
   * @params:{
   *   msg:传入的信息
   *   borderStatus:是否展示底部border
   * }
   */
  export default {
    props:{
      msg:{
        type:String,
        default:'Header'
      },
      borderStatus:{
        type:Boolean,
        default:true
      }
    },
    data() {
      return {}
    },
    created() {

    },
    mounted() {

    },
    methods: {}
  }
</script>

<style scoped>

</style>
