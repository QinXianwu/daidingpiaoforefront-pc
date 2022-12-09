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
              v-if="isRefresh"
              :ticketInfo="item"
              :passengerInfo="passenger"
              :ref="`TicketFromData-${passenger.id}`"
              :seatTypeOptions="getSeatTypeOptions(item.acceptSeatName)"
            />
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
    <div class="nothing" v-else>
      <span class="nothing-text">暂无数据</span>
    </div>
    <SelectNoTicketType
      :show.sync="showSelectNoTicketType"
      :noTicketResult.sync="noTicketResult"
      @on-success="ticketingAction"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";
import CONST from "@/constants/index";
import filters from "@/filters/index";
import TicketFromData from "./TicketFromData.vue";
import SelectNoTicketType from "./SelectNoTicketType.vue";

export default {
  name: "TicketFormList",
  components: { TicketFromData, SelectNoTicketType },
  props: {
    ticketList: {
      type: Array,
      default: () => [],
    },
    orderInfo: {
      type: Object,
      default: () => ({}),
    },
    payTradeInfo: {
      type: Object,
      default: () => ({}),
    },
    eorderNumber: {
      type: String,
      default: "",
    },
    alipayAccount: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      isRefresh: true,
      activeNames: [],
      formDataMap: {}, // 乘客表单map
      noTicketResult: {}, // 无票原因
      validationMethodsList: [], // 校验方法列表
      showSelectNoTicketType: false, // 显示选择无票类型
    };
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.user.userInfo,
    }),
    eorderCode({ userInfo }) {
      return userInfo?.eOrderNumberPrefix || "";
    },
    // 订单表单数据
    formOrderData({ orderInfo, payTradeInfo, eorderCode, eorderNumber }) {
      return {
        id: orderInfo.id,
        agentCode: orderInfo.agentCode,
        agentName: orderInfo.agentName,
        contactMobile: orderInfo.contactMobile,
        currentTime: orderInfo.currentTime,
        orderPrice: orderInfo.orderPrice,
        partnerOrderId: orderInfo.partnerOrderId,
        resultMsg: orderInfo.resultMsg || "出票失败",
        eorderNumber: eorderCode + eorderNumber,
        payTradeNumber: payTradeInfo?.paymentNumber,
        ...payTradeInfo,
      };
    },
    // 出票行程数据
    formTicketList({ ticketList, formDataMap }) {
      if (!ticketList?.length) return [];
      return ticketList.map((item) => {
        const passengerList = item?.passengerList?.map((pItem) => {
          return {
            id: pItem.id,
            passengerId: pItem.passengerId,
            passengerName: pItem.passengerName,
            passengerType: pItem.passengerType,
            passportNumber: pItem.passportNumber,
            passportType: pItem.passportType,
            passportTypeName: pItem.passportTypeName,
            ticketName: formDataMap[pItem.id].ticketName,
            realTicketPrice: formDataMap[pItem.id].realTicketPrice,
            carriageNo: formDataMap[pItem.id].carriageNo,
            seatName: formDataMap[pItem.id].seatName,
            seatNo: formDataMap[pItem.id].seatNo,
          };
        });
        return {
          id: item.id,
          arriveTime: item.arriveTime,
          deliveryTicketId: item.deliveryTicketId,
          departTime: item.departTime,
          fromStationName: item.fromStationName,
          toStationName: item.toStationName,
          trainNumber: item.trainNumber,
          ticketType: item.ticketType,
          ticketCount: item.ticketCount,
          passengerList: passengerList || [],
        };
      });
    },
  },
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
    // 出票总金额
    getTicketTotalAmount() {
      let totalAmount = 0;
      const values = Object.values(this.formDataMap);
      values.forEach(
        (item) => (totalAmount += Number(item?.realTicketPrice) || 0)
      );
      return totalAmount;
    },
    // 处理TicketFromData组件进行校验数据
    handleTicketFromData() {
      if (!this.ticketList?.length) return;
      this.ticketList.map((ticketing) => {
        const passengerList = ticketing?.passengerList || [];
        passengerList.forEach(async (item) => {
          // dom中使用for -> TicketFromData组件只有一个
          const index = 0;
          // console.log(this.$refs[`TicketFromData-${item.id}`]);
          const TicketFromData = this.$refs[`TicketFromData-${item.id}`][index];
          // 存储校验方法
          this.validationMethodsList.push(TicketFromData.handleSubmit);
          this.formDataMap[item.id] = TicketFromData.formData;
        });
      });
    },
    async onSubmit(result) {
      const expireTime = new Date(this.orderInfo?.expireTime).getTime();
      if (Date.now() > expireTime) return this.$message.error("订单已超时");
      this.handleTicketFromData();
      if (!this.validationMethodsList?.length) {
        this.$message.error("该票务未存在乘客");
        throw new Error("该票务未存在乘客");
      }

      // 校验是否全部输入乘客信息
      for (const index in this.validationMethodsList) {
        try {
          const res = await this.validationMethodsList[index]();
          if (!res.validation) throw new Error(res?.error || "校验失败");
        } catch (error) {
          console.error(error);
          return error;
        }
      }
      // 校验乘客座号是否存在重复的
      const seatNoArr = [];
      let isSeatNoExist = false;
      const tempList = [];
      for (const index in this.formTicketList) {
        const item = this.formTicketList[index];
        if (item?.passengerList?.length) tempList.push(...item.passengerList);
        // try {
        //   if (item?.passengerList?.length) {
        //     for (const _index_ in item.passengerList) {
        //       const ele = item.passengerList[_index_];
        //       if (seatNoArr.find((seatNo) => seatNo === ele?.seatNo)) {
        //         try {
        //           isSeatNoExist = true;
        //           this.$message.error(`乘客座号(${ele?.seatNo})不能重复`);
        //           throw new Error(`乘客座号(${ele?.seatNo})不能重复`);
        //         } catch (error) {
        //           console.error(error);
        //           return error;
        //         }
        //       } else seatNoArr.push(ele.seatNo);
        //     }
        //   }
        // } catch (error) {
        //   console.error(error);
        //   return error;
        // }
      }
      for (const _index_ in tempList) {
        const ele = tempList[_index_];
        if (seatNoArr.find((seatNo) => seatNo === ele?.seatNo)) {
          try {
            isSeatNoExist = true;
            this.$message.error(`乘客座号(${ele?.seatNo})不能重复`);
            throw new Error(`乘客座号(${ele?.seatNo})不能重复`);
          } catch (error) {
            console.error(error);
            return error;
          }
        } else seatNoArr.push(ele.seatNo);
      }
      if (isSeatNoExist) return;
      if (!this.alipayAccount) return this.$message.error("请选择支付宝账号");
      if (!this.payTradeInfo?.paymentNumber)
        return this.$message.error("请匹配或手填支付流水号");
      if (!result) return (this.showSelectNoTicketType = true);
      this.ticketingAction(result);
    },
    // 有票/无票
    async ticketingAction(type) {
      const fmt = "yyyy-MM-dd hh:mm:ss";
      const query = { ...this.formOrderData };
      query.orderPrice = String(this.getTicketTotalAmount()); // 获取实际出票总金额
      const state = type // 出票状态
        ? CONST.ORDER_RESULT_CODE.SUCCESS
        : this.noTicketResult.type;
      query.resultMsg =
        state === CONST.ORDER_RESULT_CODE.SUCCESS
          ? "出票成功"
          : this.noTicketResult.resultMsg || query.resultMsg;
      query.orderResultCode = String(state);
      query.failCode = String(state);
      query.ticketSuccessTime = filters.formatDate(Date.now(), fmt); // 出票成功时间
      query.ticketList = this.formTicketList;
      console.log(query);
      const [, res] = await this.$http.Order.OperationTicketing({
        bodyInfo: query,
      });
      this.$message[res ? "success" : "error"](`操作${res ? "成功" : "失败"}`);
      if (res) {
        this.isRefresh = false;
        this.$emit("success", this.orderInfo);
        this.$nextTick(() => {
          this.isRefresh = true;
        });
      }
    },
  },
  mounted() {
    this.handleTicketFromData();
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
