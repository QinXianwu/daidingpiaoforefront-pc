<template>
  <div class="login">
    <div
      class="container"
      :style="`background-image: url(${backgroundImage})`"
    />
    <div class="loginCollections">
      <div class="main">
        <div
          class="el-card box-card is-always-shadow"
          :class="{ mobile: isMobile }"
        >
          <div class="el-card__body" v-if="!isScanCode">
            <div class="head">
              <span class="title">密码登录</span>
            </div>
            <el-form ref="form" :model="formData" :rules="rules">
              <el-form-item label="" prop="username">
                <el-input
                  class=""
                  clearable
                  placeholder="账号"
                  v-model="formData.username"
                  @keyup.enter.native="onSumbit"
                ></el-input>
              </el-form-item>
              <el-form-item label="" prop="password">
                <el-input
                  show-password
                  type="password"
                  placeholder="密码"
                  v-model="formData.password"
                  @keyup.enter.native="onSumbit"
                ></el-input>
              </el-form-item>
            </el-form>
            <el-button class="sumbit-button" type="primary" @click="onSumbit"
              >登录</el-button
            >
          </div>
          <div class="scan-code" v-else>
            <ScanCodeLogin :isScanCode.sync="isScanCode" />
          </div>
          <!-- <div class="action">
            <el-button type="text" @click="isScanCode = true" v-if="!isScanCode"
              >扫码快捷登录</el-button
            >
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { mapGetters } from "vuex";
import ScanCodeLogin from "./components/ScanCodeLogin.vue";
import backgroundImage from "./images/backgroundImage.jpg";
export default {
  name: "Login",
  components: { ScanCodeLogin },
  data() {
    return {
      backgroundImage,
      formData: {},
      rules: {
        username: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
      isScanCode: false,
    };
  },
  computed: {
    ...mapState({
      token: (state) => state.authorization.state,
    }),
    ...mapGetters({
      isMobile: "isMobile",
    }),
  },
  created() {
    if (this.token && this.isMobile) {
      this.$router.push("/AppletOrder");
    } else if (this.token) {
      this.$router.push("/Home/BasicFacts");
    }
  },
  methods: {
    async onSumbit() {
      try {
        const valid = await this.$refs.form.validate();
        if (!valid) {
          return;
        }
      } catch (error) {
        console.log(error);
        return;
      }
      await this.$store.dispatch("authorization/Login", this.formData);
    },
  },
};
</script>
<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100vh;
  position: fixed;
  background-size: cover;
  background-repeat: no-repeat;
}

.loginCollections {
  position: absolute;
  top: 258px;
  left: 50%;
  transform: translateX(-50%);
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
  .box-card {
    width: 480px;
    &.mobile {
      width: 310px;
    }
    height: 500px;
    text-align: center;
    margin: 0 auto;
    padding: 0 32px;
    border-radius: 10px;
    ::v-deep .el-form-item {
      width: 100%;
      margin-bottom: 30px;
    }
    ::v-deep .el-input .el-input__inner {
      height: 48px;
      color: #333;
      border: 1px solid #e9e9e9;
      padding: 12px 7px;
    }
  }
  .sumbit-button {
    width: 100%;
    height: 55px;
    font-size: 16px;
    padding: 13px 0 14px 0;
    border-radius: 40px;
  }
  .action {
    padding: 27px 0 0;
  }
}
</style>
