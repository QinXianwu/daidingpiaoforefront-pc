<template>
  <div class="TicketFormList">
    <div class="content-title">
      <span>乘客信息</span>
    </div>
    <el-collapse
      v-if="ticketList && ticketList.length"
      @click.stop.native="() => {}"
      v-model="activeNames"
    >
      <el-collapse-item
        v-for="(item, index) in ticketList"
        :key="index"
        :name="index"
      >
        <template slot="title">
          <div class="title">
            <div class="title-l more">
              <span>可接受席位：</span>
              <span class="remark">{{ item.acceptSeatRemark || "空" }}</span>
            </div>
            <div class="title-r">
              {{ $CONST.TICKET_TYPE_TEXT[item.ticketType] }}
              <i
                class="el-icon-arrow-left icon"
                :class="{ iconActive: activeNames.includes(index) }"
              ></i>
            </div>
          </div>
        </template>
        <div class="more-content">
          <div
            class="ticketing-item"
            v-for="(passenger, key) in item.passengerList"
            :key="key"
          >
            <TicketFromData
              :ticketInfo="item"
              :passengerInfo="passenger"
              :ref="`TicketFromData-${item.id}`"
              :seatTypeOptions="getSeatTypeOptions(item.acceptSeatName)"
            />
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
    <div class="nothing" v-else>
      <span class="nothing-text">暂无数据</span>
    </div>
  </div>
</template>

<script>
import TicketFromData from "./TicketFromData.vue";
export default {
  name: "TicketFormList",
  components: { TicketFromData },
  props: {
    ticketList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      activeNames: [],
    };
  },
  computed: {},
  methods: {
    // 获取座位类型
    getSeatTypeOptions(arrJson) {
      const arr =
        typeof arrJson === "string" ? JSON.parse(arrJson || `[]`) : [];
      return arr.map((item, index) => ({
        label: item,
        value: index,
      }));
    },
  },
  mounted() {
    //
  },
};
</script>
<style lang="scss" scoped>
.TicketFormList {
  padding: 10px 0 0;
  .content-title {
    margin: 0 20px 10px;
    color: $tip-font-color;
  }
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    padding: 0 20px;
    margin-bottom: 10px;
    background: #fefcef;
    color: $main-font-color;
    box-shadow: 0px 0px 16px 1px rgba(81, 113, 170, 0.16);

    .remark {
      color: $--color-warning;
    }
    &-r {
      color: $--color-warning;
      font-weight: bold;
      font-size: 15px;
    }
  }
  .icon {
    transition: all 0.3s;
  }
  .iconActive {
    transform: rotate(-90deg);
  }
  .nothing {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    &-text {
      color: $--color-info;
      font-size: 14px;
      padding: 10px 0;
    }
  }
  ::v-deep .el-collapse-item__header {
    height: auto;
    display: block;
    border: none;
    -webkit-tap-highlight-color: transparent !important;
  }
  ::v-deep .el-collapse-item__arrow.el-icon-arrow-right {
    display: none;
    opacity: 0;
  }
  ::v-deep .el-collapse,
  ::v-deep .el-collapse-item__wrap {
    border: none;
  }
}
</style>
