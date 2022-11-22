<template>
  <div v-if="!item.hidden">
    <template
      v-if="
        hasOneShowingChild(item.children, item) &&
        (!onlyOneChild.children || onlyOneChild.noShowingChildren) &&
        !item.alwaysShow
      "
    >
      <AppLink
        v-if="onlyOneChild.meta"
        :to="resolvePath(onlyOneChild.path)"
        :query="onlyOneChild.query"
      >
        <ElMenuItem
          class="submenu-title"
          :index="resolvePath(onlyOneChild.path)"
          :class="{ 'submenu-title-noDropdown': !isNest }"
        >
          <i
            :class="`${icon} sub-el-icon`"
            v-if="icon && icon.includes('el-icon')"
          />
          <svg-icon :icon-class="icon" v-else-if="icon" />
          <span slot="title">{{ onlyOneChild.meta.title }}</span>
          <el-badge
            class="badge"
            v-if="getBadgeValue(item)"
            :value="getBadgeValue(item)"
          />
        </ElMenuItem>
      </AppLink>
    </template>

    <ElSubmenu
      v-else
      ref="subMenu"
      :index="resolvePath(item.path)"
      popper-append-to-body
    >
      <template slot="title">
        <i
          :class="`${icon} sub-el-icon`"
          v-if="item.meta && icon && icon.includes('el-icon')"
        />
        <svg-icon :icon-class="icon" v-else-if="item.meta && icon" />
        <span slot="title" v-if="item.meta">
          <el-badge is-dot class="item-badge" v-if="isShowDot(item)">
            {{ item.meta.title }}
          </el-badge>
          <el-badge
            class="item-badge"
            v-else-if="ticketsNnotHandOrderMap[item.meta.agentCode]"
            :value="ticketsNnotHandOrderMap[item.meta.agentCode]"
          >
            {{ item.meta.title }}
          </el-badge>
          <span v-else>
            {{ item.meta.title }}
          </span>
        </span>
      </template>
      <SidebarItem
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      />
    </ElSubmenu>
  </div>
</template>

<script>
import path from "path";
import { isExternal } from "@/utils/validate";
import AppLink from "./Link";
import FixiOSBug from "./FixiOSBug";
import { mapGetters } from "vuex";

export default {
  name: "SidebarItem",
  components: {
    AppLink,
  },
  mixins: [FixiOSBug],
  props: {
    // route object
    item: {
      type: Object,
      required: true,
    },
    isNest: {
      type: Boolean,
      default: false,
    },
    basePath: {
      type: String,
      default: "",
    },
  },
  data() {
    // To fix https://github.com/PanJiaChen/vue-admin-template/issues/237
    // TODO: refactor with render function
    this.onlyOneChild = null;
    return {};
  },
  methods: {
    hasOneShowingChild(children = [], parent) {
      const showingChildren = children.filter((item) => {
        if (item.hidden) {
          return false;
        } else {
          // Temp set(will be used if only has one showing child)
          this.onlyOneChild = item;
          return true;
        }
      });

      // When there is only one child router, the child router is displayed by default
      if (showingChildren.length === 1) {
        return true;
      }

      // Show parent if there are no child router to display
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ...parent, path: "", noShowingChildren: true };
        return true;
      }

      return false;
    },
    resolvePath(routePath) {
      if (isExternal(routePath)) {
        return routePath;
      }
      if (isExternal(this.basePath)) {
        return this.basePath;
      }
      return path.resolve(this.basePath, routePath);
    },
    isShowDot(item) {
      const ticketsKeys = Object.keys(this.ticketsNnotHandOrderMap);
      return (
        (item?.name === "Order" && ticketsKeys.length) ||
        (item?.name === "OrderRefund" && this.refundNnotHandOrderMap)
      );
    },
    getBadgeValue(item) {
      const ticketValue = this.ticketsNnotHandOrderMap[item.meta.agentCode];
      if (!item.meta.isShowNotHandleCount) return 0;
      else if (item.meta.agentCode && ticketValue) return ticketValue;
      else if (item.name === "NonReadyMoney" && this.refundNnotHandOrderMap)
        return this.refundNnotHandOrderMap;
      return 0;
    },
  },
  computed: {
    ...mapGetters({
      ticketsNnotHandOrderMap: "agent/ticketsNnotHandOrderMap",
      refundNnotHandOrderMap: "agent/refundNnotHandOrderMap",
    }),
    icon({ onlyOneChild, item }) {
      return onlyOneChild.meta.icon || (item.meta && item.meta.icon);
    },
  },
};
</script>

<style scoped>
.sub-el-icon {
  color: currentColor;
  width: 1em;
  height: 1em;
}

.badge {
  margin-right: 5px;
  line-height: 16px;
}
::v-deep .item-badge .el-badge__content.is-fixed {
  top: 10px;
}
</style>
