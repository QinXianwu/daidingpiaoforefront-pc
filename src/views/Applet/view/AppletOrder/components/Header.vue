<template>
  <div class="HeaderView">
    <div class="content-top">
      <div class="title">打票及回填</div>
      <div class="icon" @click="$store.dispatch('authorization/LogoutAsync')">
        <img src="/src/assets/images/exit.png" alt="" />
      </div>
    </div>
    <div class="content-main">
      <div class="tab" v-if="tabData && tabData.length">
        <div
          class="tab-item"
          :class="{ active: String(item.value) === String(activeKey) }"
          v-for="(item, index) in tabData"
          :key="index"
          @click="onChange(item)"
        >
          <span>{{ item.label }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "HeaderView",
  props: {
    activeKey: {
      type: [Number, String],
      default: "-1",
    },
  },
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapState({
      pointSaleList: (state) => state.agent.pointSaleList,
    }),
    tabData({ pointSaleList }) {
      if (!pointSaleList?.length) return [];
      return pointSaleList.map((item) => ({
        label: item?.name,
        value: item?.code,
      }));
    },
  },
  methods: {
    onChange(item) {
      const data = this.pointSaleList.find((ele) => ele?.code === item.value);
      this.$emit("update:activeKey", item.value);
      this.$emit("on-chang", data);
    },
  },
  mounted() {
    //
  },
};
</script>
<style lang="scss" scoped>
.HeaderView {
  width: 100%;
  .content-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-right: 20px;
    .title {
      text-align: right;
      font-size: 20px;
      font-weight: 400;
      color: #ffffff;
    }
  }
  .content-top .icon {
    width: 34px;
    height: 34px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .content-main {
    padding: 10px 0;
  }
  .tab {
    display: flex;
    padding: 10px 0 5px;
    overflow-x: scroll;
    align-items: center;
    height: 40px;
    &-item {
      min-width: fit-content;
      color: #fff;
      margin-right: 36px;
      border-radius: 6px 6px 6px 6px;
      transition: all 0.3s;
    }
    &-item.active {
      padding: 10px 20px;
      background: #fff;
      color: $--color-primary;
    }
  }
}
</style>
