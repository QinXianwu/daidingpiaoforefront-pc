<template>
  <div>
    <i :class="`${icon} sub-el-icon`" v-if="icon && icon.includes('el-icon')" />
    <svg-icon :icon-class="icon" v-else-if="icon" />
    <span slot="title" v-show="title || isCollapse">{{ title }}</span>
  </div>
</template>

<!-- <script> -->
<script lang="jsx">
import { mapGetters } from "vuex";

export default {
  name: "MenuItem",
  // functional: true,
  props: {
    icon: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
  },
  computed: {
    ...mapGetters(["sidebar"]),
    isCollapse() {
      return !this.sidebar.opened;
    },
  },
  // render(h, context) {
  //   const { icon, title } = context.props;
  //   const vnodes = [];

  //   if (icon) {
  //     if (icon.includes("el-icon")) {
  //       vnodes.push(<i class={[icon, "sub-el-icon"]} />);
  //     } else {
  //       vnodes.push(<svg-icon icon-class={icon} />);
  //     }
  //   }

  //   if (title) {
  //     vnodes.push(<span slot="title">{title}</span>);
  //   }
  //   return vnodes;
  // },
};
</script>

<style scoped>
.sub-el-icon {
  color: currentColor;
  width: 1em;
  height: 1em;
}
</style>
