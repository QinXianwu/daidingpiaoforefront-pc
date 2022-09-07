<template>
  <div class="footer">
    <div class="item">
      <div class="mobile-phone">
        <CopyButton :copyString="mobilePhone || ''">
          <span class="phone">{{ mobilePhone || "---" }}</span>
          <span class="copy">复制</span>
        </CopyButton>
      </div>
      <div class="application">
        <el-button type="primary">匹配流水号</el-button>
        <el-button>手机流水号</el-button>
      </div>
    </div>
    <div class="item">
      <div class="emit">
        <span class="label mr-10">电子邮箱：E</span>
        <el-input
          type="emit"
          v-model="emit"
          class="min-input"
          placeholder="选填"
        />
      </div>
    </div>
    <div class="submit">
      <el-button type="success" size="medium" @click="$emit('onSubmit', true)"
        >有票</el-button
      >
      <el-button type="danger" size="medium" @click="$emit('onSubmit', false)"
        >无票</el-button
      >
    </div>
  </div>
</template>

<script>
import CopyButton from "@/components/CopyButton/index";

export default {
  props: {
    mobilePhone: {
      type: String,
      default: "",
    },
  },
  components: { CopyButton },
  data() {
    return {
      emit: "",
    };
  },
};
</script>
<style lang="scss" scoped>
.item {
  display: flex;
  align-items: center;
  margin-left: 30px;
  .mobile-phone {
    color: $main-font-color;
    margin-right: 50px;
    .phone {
      font-size: 22px;
      font-weight: 500;
      color: $main-font-color;
    }
  }
  .emit {
    padding: 20px 10px;
    font-size: 14px;
    font-weight: 400;
    color: $sub-font-color;
  }
}

.submit {
  display: flex;
  justify-content: center;
  padding: 20px 0;
  border-top: 1px solid #eee;
}

.copy {
  font-size: 12px;
  font-weight: 400;
  color: #666666;
  padding: 2px 10px;
  margin: 0 10px;
  background: #eee;
}
</style>
