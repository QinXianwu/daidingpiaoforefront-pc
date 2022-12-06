<template>
  <div class="TicketList">
    <div class="title">
      <span>订票列表</span>
    </div>
    <div class="content">
      <div class="list" v-if="list && list.length">
        <div class="title">出票明细</div>
        <div class="list-item" v-for="(item, index) in list" :key="index">
          <div class="ticket-info">
            <span class="order-data">{{ item.createTime }}</span>
            <TimeDown
              :reminderTime="120"
              :targerTime="item.expireTime"
              @on-reminder="$emit('onReminder')"
              @on-change="$emit('onCountdownOver', item)"
            />
          </div>
          <div class="ticket-info-list">
            <!-- 出票头部信息 -->
            <TicketInfoList />
          </div>
          <el-collapse accordion>
            <el-collapse-item
              v-for="(ticketing, key) in item.ticketList"
              :key="key"
            >
              <template slot="title"> {{ ticketing.ticketType }} </template>
              <div>
                与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；
              </div>
            </el-collapse-item>
          </el-collapse>
        </div>
      </div>
      <div class="nothing" v-else>
        <div class="nothing-img">
          <img src="../images/something.png" alt="" />
        </div>
        <span class="nothing-text">空空如也</span>
      </div>
    </div>
  </div>
</template>

<script>
import TicketInfoList from "./TicketInfoList.vue";
import TimeDown from "@/components/TimeDown/index";

export default {
  name: "TicketList",
  components: { TicketInfoList, TimeDown },
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {};
  },
  computed: {},
  methods: {},
  mounted() {
    //
    console.log("TicketList");
  },
};
</script>
<style lang="scss" scoped>
.TicketList {
  .title {
    height: 20px;
    font-size: 15px;
    font-weight: 700;
    color: #282828;
    line-height: 20px;
    margin-bottom: 10px;
    padding: 0 20px 0;
  }
  .content {
    padding: 10px 20px 10px;
    background: #fff;
    .title {
      padding: 0;
    }
  }
  .ticket-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .order-data {
      color: $sub-font-color;
    }
  }
  .nothing {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 60px 0 20px;
    &-img {
      width: 120px;
      height: 120px;
    }
    &-img img {
      width: 100%;
      height: 100%;
    }
    &-text {
      color: $--color-info;
      font-size: 14px;
      padding: 10px 0;
    }
  }
}
</style>
