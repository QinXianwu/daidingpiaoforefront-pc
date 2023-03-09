<template>
  <div class="ScanCodeLogin">
    <div class="head">
      <div class="title">快捷登录</div>
    </div>
    <div class="qrcode">
      <div class="qrcode-content">
        <canvas ref="QrcodeCanvas" />
      </div>
      <div class="qrcode-expired">
        <span></span>
      </div>
      <div class="qrcode-loading"></div>
    </div>
    <div class="tip">
      <span class="form-tip">请使用微信扫描登录</span>
    </div>
    <div class="action">
      <el-button type="text" @click="$emit('update:isScanCode', false)"
        >账号密码登录</el-button
      >
      <el-button type="text" @click="generateQRcode">刷新二维码</el-button>
    </div>
  </div>
</template>

<script>
// import { v4 as uuidv4 } from "uuid";
import QRcode from "qrcode";

export default {
  name: "ScanCodeLogin",
  components: {},
  props: {
    isScanCode: Boolean,
  },
  data() {
    return {
      ifRefresh: false,
      isLoading: false,
    };
  },
  computed: {},
  methods: {
    generateQRcode() {
      this.$nextTick(() => {
        QRcode.toCanvas(
          this.$refs.QrcodeCanvas,
          "http://jilichen.cn:8900/#/Authorization/Login",
          {
            width: 200, //自定义宽度
            color: {
              // dark: "#00f", //自定义码的颜色
              // light: "#fbb", //自定义背景颜色
            },
          }
        );
      });
    },
  },
  mounted() {
    this.generateQRcode();
  },
};
</script>
<style lang="scss" scoped>
.ScanCodeLogin {
  padding: 20px;
  .head {
    text-align: center;
    .title {
      font-size: 24px;
      display: inline-block;
      margin: 31px 0 49px -4px;
      font-weight: 700;
      color: #333;
      line-height: 33px;
    }
  }
  .qrcode {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    &-content {
      border: 1px solid #ccc;
    }
  }
  .tip {
    padding: 5px 0;
  }
  .action {
    padding: 17px 0 0;
  }
}
</style>
