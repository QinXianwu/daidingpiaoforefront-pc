<template>
  <div class="view-container">
    <el-tabs v-model="activeName">
      <el-tab-pane label="出票-回复客服" name="BookingSuccess" />
      <el-tab-pane label="改签-回复客服" name="AfreshBooking" />
    </el-tabs>

    <BookingSuccess v-if="activeName === 'BookingSuccess'" />
    <AfreshBooking v-if="activeName === 'AfreshBooking'" />
  </div>
</template>

<script>
import BookingSuccess from "./components/BookingSuccess/index.vue";
import AfreshBooking from "./components/AfreshBooking/index.vue";

export default {
  name: "NoticeManage",
  components: {
    BookingSuccess,
    AfreshBooking,
  },
  data() {
    return {
      activeName: "BookingSuccess",
    };
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.view-container {
  background: #ffffff;
}
</style>
