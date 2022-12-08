<template>
  <div class="TicketInfoList">
    <div class="ticket-list">
      <div
        class="ticket-item"
        v-for="(item, index) in [shiftItem]"
        :key="index"
      >
        <div class="site">
          <span class="start">
            <div class="name">{{ item.fromStationName }}</div>
            <span class="date"
              >({{ item.departTime | formatDate("hh:mm") }})</span
            >
          </span>
          <span class="end">
            <div class="name">{{ item.toStationName }}</div>
            <span class="endDate date">
              <span
                :data-attr="afterDay(item)"
                :class="{ 'after-day': afterDay(item) > 0 }"
                >{{ item.arriveTime | formatDate("hh:mm") }}</span
              >
            </span>
          </span>
          <span class="car-num">{{ item.trainNumber || "-" }} 次</span>
        </div>
        <div class="remark">
          <span> {{ $CONST.TICKET_TYPE_TEXT[item.ticketType] }}</span>
        </div>
      </div>
      <el-collapse
        accordion
        v-if="list && list.length"
        @change="(val) => (isExpand = !!val)"
        @click.stop.native="() => {}"
      >
        <el-collapse-item name="moreList">
          <template slot="title">
            <div class="more">{{ isExpand ? "收起" : "查看" }}更多车次信息</div>
          </template>
          <div class="more-content">
            <div class="ticket-item" v-for="(item, index) in list" :key="index">
              <div class="site">
                <span class="start">
                  <div class="name">{{ item.fromStationName }}</div>
                  <span class="date"
                    >({{ item.departTime | formatDate("hh:mm") }})</span
                  >
                </span>
                <span class="end">
                  <div class="name">{{ item.toStationName }}</div>
                  <span class="endDate date">
                    <span
                      :data-attr="afterDay(item)"
                      :class="{ 'after-day': afterDay(item) > 0 }"
                      >{{ item.arriveTime | formatDate("hh:mm") }}</span
                    >
                  </span>
                </span>
                <span class="car-num">{{ item.trainNumber || "-" }} 次</span>
              </div>
              <div class="remark">
                <span> {{ $CONST.TICKET_TYPE_TEXT[item.ticketType] }}</span>
              </div>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
export default {
  name: "TicketInfoList",
  components: {},
  props: {
    ticketList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      list: [],
      shiftItem: {},
      isExpand: false,
    };
  },
  computed: {},
  methods: {
    afterDay({ info }) {
      if (info?.departTime && info?.arriveTime) {
        const stateDate = this.$options.filters.formatDate(info.departTime);
        const endDate = this.$options.filters.formatDate(info.arriveTime);
        const stateTime = new Date(stateDate).getTime();
        const endTime = new Date(endDate).getTime();
        const day = (endTime - stateTime) / (1 * 24 * 60 * 60 * 1000);
        return `+${Number.parseInt(day > 0 ? day : 0)}`;
      } else {
        return 0;
      }
    },
  },
  mounted() {
    const temp = [...(this.ticketList || [])];
    this.shiftItem = temp.shift() || {};
    this.list = temp;
  },
};
</script>
<style lang="scss" scoped>
.TicketInfoList {
  padding: 10px 0 0;
  .ticket-item {
    display: flex;
    justify-content: space-between;
    padding: 15px 18px;
    margin-bottom: 10px;
    border-radius: 10px;
    background: #f7f8fa;
    .start,
    .end {
      position: relative;
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      height: 17px;
      &::before {
        content: "";
        width: 7px;
        height: 7px;
        background: #fff;
        border: 1px solid $--color-primary;
        border-radius: 50%;
        margin-right: 5px;
      }
    }
    .start::after {
      content: "";
      width: 0;
      height: 13px;
      border-left: 1px dashed $tip-font-color;
      position: absolute;
      left: 4px;
      top: 16px;
    }
    .site {
      display: flex;
      flex-direction: column;
    }
    .name {
      // min-width: 75px;
      margin-right: 5px;
      font-size: 14px;
      font-weight: bold;
      color: $main-font-color;
    }
    .date {
      font-size: 16px;
      font-weight: bold;
      color: $main-font-color;
    }
    .car-num {
      font-size: 14px;
      color: $sub-font-color;
      margin-left: 15px;
      height: 16px;
      line-height: 16px;
    }
  }
  .endDate {
    &::before {
      content: "(";
    }
    &::after {
      content: ")";
    }
    .after-day::after {
      content: attr(data-attr);
      position: relative;
      top: -10px;
      color: #000;
      font-size: 14px;
    }
  }
  .remark {
    font-size: 15px;
    color: $--color-warning;
    font-weight: bold;
  }
  .more {
    width: 100%;
    background: #f7f8fa;
    color: $tip-font-color;
    border-radius: 10px;
    text-align: center;
  }
  .more-content {
    padding: 10px 0;
  }
  ::v-deep .el-collapse-item__header {
    display: block;
    border: none;
    height: 40px;
    line-height: 40px;
    -webkit-tap-highlight-color: transparent !important;
  }
  ::v-deep .el-collapse-item__arrow.el-icon-arrow-right {
    opacity: 0;
    display: none;
  }
  ::v-deep .el-collapse,
  ::v-deep .el-collapse-item__wrap {
    border: none;
  }
  ::v-deep .el-collapse-item__content {
    padding-bottom: 0px;
  }
}
</style>
