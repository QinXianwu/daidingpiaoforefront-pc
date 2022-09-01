<template>
  <div class="Statistics">
    <div class="Statistics-title">数据统计</div>
    <el-select
      v-model="dateType"
      placeholder="请选择"
      class="Statistics-select"
      @change="getInfo"
    >
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
    <template v-if="dateRange.length">
      <!-- 今天 -->
      <div
        class="Statistics-val"
        v-if="dateType === $CONST.STATISTICS_TYPE.TODAY"
      >
        {{ end | formatDate }}
      </div>
      <!-- 近7天 -->
      <div
        class="Statistics-val"
        v-if="dateType === $CONST.STATISTICS_TYPE.DAY7"
      >
        {{ start7 | formatDate }}&nbsp;-&nbsp;{{ end | formatDate }}
      </div>
      <!-- 近30天 -->
      <div
        class="Statistics-val"
        v-if="dateType === $CONST.STATISTICS_TYPE.DAY30"
      >
        {{ start30 | formatDate }}&nbsp;-&nbsp;{{ end | formatDate }}
      </div>
      <!-- 自然日 -->
      <el-date-picker
        v-if="dateType === $CONST.STATISTICS_TYPE.DAY"
        v-model="dateTime"
        type="date"
        placeholder="选择日期"
        value-format="yyyy-MM-dd"
        @change="getInfo"
      >
      </el-date-picker>
      <!-- 自然周 -->
      <el-date-picker
        v-if="dateType === $CONST.STATISTICS_TYPE.WEEK"
        v-model="weekTime"
        type="week"
        format="yyyy 第 WW 周"
        placeholder="选择周"
        value-format="yyyy-MM-dd"
        @change="getInfo"
      >
      </el-date-picker>
      <!-- 自然月 -->
      <el-date-picker
        v-if="dateType === $CONST.STATISTICS_TYPE.MONTH"
        v-model="monthTime"
        type="month"
        placeholder="选择月"
        value-format="yyyy-MM-dd"
        @change="getInfo"
      >
      </el-date-picker>
      <!-- 自定义 -->
      <el-date-picker
        v-if="dateType === $CONST.STATISTICS_TYPE.CUSTOM"
        v-model="dateRange"
        type="daterange"
        align="right"
        unlink-panels
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        value-format="yyyy-MM-dd"
        :picker-options="pickerOptions"
        @change="getInfo"
      >
      </el-date-picker>
    </template>
  </div>
</template>

<script>
import CONST from "@/constants";
import filters from "@/filters";
const end = new Date(); // 今天
const start7 = new Date(); // 7天前
start7.setTime(start7.getTime() - 3600 * 1000 * 24 * 7);
const start30 = new Date(); // 30天前
start30.setTime(start30.getTime() - 3600 * 1000 * 24 * 30);
const endStr = filters.formatDate(end); //今天时间转字符串
const monday = filters.formatDate(getMonday(new Date())); //本周周一
// 获取初始的周一
function getMonday(date) {
  var day = date.getDay();
  var deltaDay;
  if (day === 0) {
    deltaDay = 6;
  } else {
    deltaDay = day - 1;
  }
  var monday = new Date(date.getTime() - deltaDay * 24 * 60 * 60 * 1000);
  monday.setHours(0);
  monday.setMinutes(0);
  monday.setSeconds(0);
  return monday; //返回本周的周一的0时0分0秒
}
export default {
  data() {
    return {
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      dateValue: "",
      options: [
        {
          label: "今日",
          value: CONST.STATISTICS_TYPE.TODAY,
        },
        {
          label: "近7天",
          value: CONST.STATISTICS_TYPE.DAY7,
        },
        {
          label: "近30天",
          value: CONST.STATISTICS_TYPE.DAY30,
        },
        {
          label: "自然日",
          value: CONST.STATISTICS_TYPE.DAY,
        },
        {
          label: "自然周",
          value: CONST.STATISTICS_TYPE.WEEK,
        },
        {
          label: "自然月",
          value: CONST.STATISTICS_TYPE.MONTH,
        },
        {
          label: "自定义",
          value: CONST.STATISTICS_TYPE.CUSTOM,
        },
      ],
      dateTime: endStr, //自然日选项
      weekTime: monday, //自然周选项
      monthTime: end, // 自然月选项
      end, // 今天
      start7, // 近7天开始
      start30, // 近30天开始
    };
  },
  computed: {
    // 日期类型
    dateType: {
      get() {
        return this.$store.state.home.dateType;
      },
      set(val) {
        this.$store.commit("home/SET_DATE_TYPE", val);
      },
    },
    dateRange: {
      get() {
        return this.$store.state.home.dateRange;
      },
      set(val) {
        this.$store.commit("home/SET_DATE_RANGE", val);
      },
    },
  },
  methods: {
    // 获取数据
    async getInfo() {
      // 时间处理
      const startFix = " 00:00:00";
      const endFix = " 23:59:59";
      let begindate = this.dateRange?.length && this.dateRange[0] + startFix;
      let enddate = this.dateRange?.length && this.dateRange[1] + endFix;
      // 时间处理
      switch (this.dateType) {
        case CONST.STATISTICS_TYPE.DAY7: // 7天
          begindate = filters.formatDate(this.start7) + startFix;
          enddate = filters.formatDate(end) + endFix;
          break;
        case CONST.STATISTICS_TYPE.DAY30: // 30天
          begindate = filters.formatDate(this.start30) + startFix;
          enddate = filters.formatDate(end) + endFix;
          break;
        case CONST.STATISTICS_TYPE.DAY: // 日
          begindate = this.dateTime + startFix;
          enddate = this.dateTime + endFix;
          break;
        case CONST.STATISTICS_TYPE.WEEK: {
          // 周
          begindate = this.weekTime + startFix;
          const endVal = new Date(this.weekTime);
          const end = endVal.setTime(endVal.getTime() + 3600 * 1000 * 24 * 6);
          enddate = filters.formatDate(end) + endFix;
          break;
        }
        case CONST.STATISTICS_TYPE.MONTH: {
          // 月
          const { startTime, endTime } = this.getMonthDate(this.monthTime);
          begindate = startTime + startFix;
          enddate = endTime + endFix;
          break;
        }
        default:
          break;
      }

      // 实际请求
      const [, res] = await this.$http.Data.StatisticsReport1({
        type: this.dateType,
        begindate,
        enddate,
      });
      if (res) {
        this.$store.commit("home/SET_HOME_DATA", res);
      }
    },
    // 获取月的第一天和最后一天
    getMonthDate(value) {
      let date = new Date(value);
      let month = (date.getMonth() + 1).toString().padStart(2, "0");
      let year = date.getFullYear();
      let startTime = year + "-" + month + "-01";
      let day = new Date(year, month, 0);
      let endTime = year + "-" + month + "-" + day.getDate();
      return { startTime, endTime };
    },
  },
  created() {
    this.getInfo();
  },
};
</script>

<style lang="scss" scoped>
.Statistics {
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  &-title {
    font-size: 16px;
    font-weight: bold;
    color: $main-font-color;
    line-height: 22px;
    padding-right: 10px;
  }
  &-select {
    width: 100px;
    margin-right: 10px;
  }
  &-val {
    margin-left: 10px;
    font-size: 14px;
  }
}
</style>
