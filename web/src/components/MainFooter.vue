<template>
  <section class="Footer-wrap">
    <footer class="footer-inner">
      <p>www.dongxiaoming.com - 晓明博客 Copyright&copy; Author晓明</p>
      <p><a href="http://www.miit.gov.cn" target="_blank">粤ICP备0号-3</a></p>
    </footer>
  </section>
</template>

<script>
  import {mapState, mapActions} from 'vuex';

  export default {
    data() {
      return {}
    },
  }
</script>

<style lang="scss" scoped>
  .footer-inner {
    padding: 64px 32px;
    line-height: 36px;
    text-align: center;
    font-size: 18px;
    color: #fff;
    background: #262626;
  }

  .footer-inner a {
    color: #fff;
    text-decoration: none;
  }
</style>
