<template>
  <!-- 全局提示控制器 -->
  <div class="AppPromptController">
    <audio
      ref="AppAudio"
      :hidden="true"
      :src="audioSrc"
      :muted="isAudio"
      controls
    >
      <source :src="audioSrc" />
    </audio>
  </div>
</template>

<script>
import { mapState } from "vuex";
import refund from "assets/media/refund.mp3";
import timeout from "assets/media/timeout.wav";
import neworder from "assets/media/neworder.wav";

export default {
  name: "AppPromptController",
  components: {},
  data() {
    return {
      neworderAudio: new Audio(neworder), // // 新订单提示
      refundAudio: new Audio(refund), // 订单超时提示
      timeoutAudio: new Audio(timeout), // 退票订单提示
      list: [],
    };
  },
  watch: {
    isAudio(val) {
      if (!val) this.$refs.AppAudio.play();
    },
  },
  computed: {
    ...mapState({
      isAudio: (state) => state.app.isAudio, // 是否开启声音
      userInfo: (state) => state.user.userInfo,
      pointSaleList: (state) => state.agent.pointSaleList,
    }),
    receiveOrderLimit({ userInfo }) {
      return userInfo?.receiveOrderLimit || 1;
    },
    audioSrc() {
      return neworder;
    },
    pointSaleInit({ pointSaleList }) {
      if (!pointSaleList?.length) return [];
      return pointSaleList.map((item) => ({
        code: item.code,
        lastId: 0,
      }));
    },
  },
  methods: {
    // 处理新订单提示
    async handleNewOrderTip(query) {
      const [, res] = await this.$http.Order.GetNewOrderCount({
        current: 1,
        size: this.receiveOrderLimit,
        paramData: {
          orderParamList: [...query],
        },
      });
      const tempArr = [...this.pointSaleInit];
      if (res?.length) {
        tempArr.forEach((item) => {
          const ele = res.find((e) => e.code === item.code);
          if (ele) item.lastId = ele.lastId;
        });
      }
      this.$nextTick(() => {
        setTimeout(() => {
          // this.handleNewOrderTip(tempArr);
        }, 5000);
      });
    },
  },
  mounted() {
    this.handleNewOrderTip(this.pointSaleInit);
    // this.$nextTick(() => {
    //   setTimeout(() => {
    //     this.$refs.AppAudio.play();
    //   }, 1000);
    // });
  },
};
</script>
<style lang="scss" scoped></style>
