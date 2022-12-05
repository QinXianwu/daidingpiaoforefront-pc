<template>
  <div class="AppletOrder">
    <div class="content">AppletOrder</div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "AppletOrder",
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      isMobile: "isMobile",
    }),
  },
  methods: {},
  mounted() {
    //
    console.log(this.isMobile);
  },
};
</script>
<style lang="scss" scoped>
.AppletOrder {
  width: 100vw;
}
</style>
