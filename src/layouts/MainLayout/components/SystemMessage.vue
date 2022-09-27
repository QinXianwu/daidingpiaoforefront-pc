<template>
  <div class="SystemMessage"></div>
</template>

<script>
export default {
  name: "SystemMessage",
  components: {},
  data() {
    return {};
  },
  computed: {},
  methods: {},
};
</script>
<style lang="scss" scoped>
.SystemMessage {
  display: flex;
  align-items: center;
  color: $sub-font-color;
  padding: 0 10px;
  margin-right: 10px;
  cursor: pointer;
  line-height: 20px;
  border-right: 1px solid #d9d9d9;
}
</style>
