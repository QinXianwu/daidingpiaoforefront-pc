<template>
  <div class="PassengerInfo">
    <div class="content" v-for="(item, index) in [1, 2]" :key="index">
      <div class="ticketInfo">
        <span class="passengerType">{{ "成人票" }}</span>
        <span class="seatName">{{ "二等座" }}</span>
        <span class="carriageNo">{{ "5车厢" }}</span>
        <span class="seatNo">{{ "7D号 座号" }}</span>
        <span class="realTicketPrice">{{ "" | formatCurrency }}</span>
      </div>
      <div class="userInfo">
        <span>{{ index + 1 }}.{{ "身份证" }}</span>
        <span class="name">{{ "张三" }}</span>
        <span class="passportNumber">{{ "440882198912125555" }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PassengerInfo",
  components: {},
  data() {
    return {};
  },
  computed: {},
  methods: {},
};
</script>
<style lang="scss" scoped>
.PassengerInfo {
  margin: 10px 0 0;
  background: #fff;
  padding: 16px 24px 10px;
}
.content {
  display: flex;
  flex-direction: column;
  margin: 0 0 20px;

  .ticketInfo,
  .userInfo {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin: 0 0 10px;
    font-size: 15px;
    span {
      margin-right: 70px;
    }
  }
  .userInfo {
    line-height: 20px;
  }
  .passengerType {
    background: #ffefe2;
    color: $--color-warning;
    border-radius: 4px 4px 4px 4px;
    padding: 4px 8px;
  }
  .carriageNo,
  .seatNo {
    background: $menuActiveText;
    color: #fff;
    border-radius: 4px 4px 4px 4px;
    padding: 4px 8px;
  }
  .realTicketPrice {
    display: flex;
    align-items: center;
    color: $--color-danger;
    font-weight: 700;
    &::after {
      content: "元";
      display: block;
      margin: 0 3px;
    }
  }
  .name,
  .passportNumber {
    color: #000;
  }
}
</style>
