<template>
  <div class="navbar">
    <Hamburger
      id="hamburger-container"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />

    <Breadcrumb id="breadcrumb-container" class="breadcrumb-container" />

    <div class="right-menu">
      <!-- 平台选择组件-内部组件 -->
      <span class="account-id">
        <CopyButton :copyString="mainAccountId" v-if="mainAccountId">
          <span class="account-id-text">账号ID：{{ mainAccountId }}</span>
          <i class="el-icon-copy-document express-info-click" />
        </CopyButton>
      </span>

      <!-- <SearchUser /> -->
      <Screenfull id="screenfull" class="right-menu-item hover-effect" />

      <!-- 用户头像 -->
      <ElDropdown class="avatar-container right-menu-item" trigger="click">
        <div class="avatar-wrapper hover-effect">
          <el-image class="user-avatar" :src="userAvatar" />
          <i class="el-icon-caret-bottom" />
        </div>
        <ElDropdownMenu slot="dropdown">
          <ElDropdownItem divided @click.native="LogoutAsync">
            <span style="display: block">退出登录</span>
          </ElDropdownItem>
        </ElDropdownMenu>
      </ElDropdown>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import defaultUserAvatar from "assets/images/user_avatar.png";
import Breadcrumb from "@/components/Breadcrumb";
import Hamburger from "@/components/Hamburger";
import Screenfull from "@/components/Screenfull";
// import SearchUser from "@/components/SearchUser";
import CopyButton from "@/components/CopyButton/index";
export default {
  components: {
    Breadcrumb,
    Hamburger,
    Screenfull,
    // SearchUser,
    CopyButton,
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.user.userInfo,
      McatGlobal: (state) => state.app.McatGlobal,
    }),
    mainAccountId({ userInfo, McatGlobal }) {
      const id = userInfo?.id || McatGlobal?.UserAccount?.UserId;
      return id ? String(id) : "";
    },
    userAvatar() {
      return defaultUserAvatar;
    },
  },
  methods: {
    ...mapActions({
      LogoutAsync: "authorization/LogoutAsync",
    }),
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    },
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;
    display: flex;
    align-items: center;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: flex;
      align-items: center;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 10px;
      display: flex;
      align-items: center;
      .avatar-wrapper {
        display: flex;
        align-items: center;
      }
      .user-avatar {
        cursor: pointer;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        border: 1px solid #d8dce5;
      }

      .el-icon-caret-bottom {
        cursor: pointer;
        font-size: 12px;
        padding-left: 8px;
      }
    }
    .account-id {
      font-weight: bold;
      margin: 0 20px;
      &-text {
        font-size: 14px;
        margin-right: 10px;
        color: $main-font-color;
      }
    }
  }
}
.mta_sys_switch {
  ::v-deep .sys_switch_target {
    padding-right: 13px;
    border-right: 1px solid #d9d9d9;
    .sys_switch_target_img {
      width: 20px;
      height: 20px;
    }
  }
}
</style>
