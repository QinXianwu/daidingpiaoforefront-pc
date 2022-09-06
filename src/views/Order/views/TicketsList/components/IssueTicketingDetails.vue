<template>
  <div class="main">
    <div class="details">
      <div class="title">
        <span>出票明细</span>
      </div>
      <div class="content">
        <div class="issue_ticketing">ticketing</div>
        <div class="issue_ticketing">ticketing</div>
      </div>
      <div class="footer"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "IssueTicketingDetails",
  components: {},
  data() {
    return {};
  },
  computed: {},
  methods: {},
};
</script>
<style lang="scss" scoped>
.main {
  background-color: #f7f8fa;
  padding: 10px;

  .details {
    padding: 10px;
    background-color: #fff;

    .title {
      font-size: 13px;
      font-weight: 600;
      color: $sub-font-color;
      line-height: 20px;
      padding: 0 0 5px;
      border-bottom: 2px solid #ececec;
    }
    .content {
      margin: 10px 0;
    }
  }
}
</style>
