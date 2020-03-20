<template>
    <div class="common_flex_negative" style="height: 100vh;overflow: hidden">
        <img src="../assets/images/common/404.png" alt="">
        <p>您访问的页面暂时无法访问</p>
        <div class="common_flex_align_center">
            <div class="error_button" style="background-color: #fff;color: #333;border: 1px #eee solid">{{time}} 秒后回到首页...</div>
            <div v-waves class="error_button" @click="toHome" style="width: 100px;margin-left: 20px">点击返回</div>
        </div>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        time: 5, // 倒计时5秒
        timeR: [], // 定时器列表，销毁时清除定时器
      }
    },
    created() {
      // 定时器
      let timer = setInterval(() => {
        this.time--
        if (this.time == 0) {
          clearInterval(timer)
          this.$router.replace({path: '/home'})
        }
      }, 1000)
      this.timeR.push(timer)
    },
    destroyed() {
      // 销毁定时器
      // clearInterval(this.timeR[0]);
    },
    methods: {
      toHome(){
        // 销毁定时器
        this.$router.replace({path: '/home'})
        clearInterval(this.timeR[0]);
      }
    }
  }
</script>

<style scoped>
    .common_flex_negative img {
        width: 437px;
        height: 282px;
    }

    .common_flex_negative p {
        font-size: 28px;
        color: rgba(51, 51, 51, 1);
        margin-top: 40px;
    }

    .common_flex_negative .error_button {
        font-size: 14px;
        margin-top: 20px;
        width: 150px;
        height: 35px;
        line-height: 35px;
        text-align: center;
        background-color: #007AFF;
        color: #fff;
        border-radius: 4px;
    }
</style>
