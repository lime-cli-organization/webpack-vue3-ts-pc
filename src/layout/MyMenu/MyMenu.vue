<template>
  <el-menu :default-active="menuActiveIndex" v-bind="attrs" router unique-opened>
    <SubMenu :data="data" />
  </el-menu>
</template>
<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import { ISubMenu } from "@/api/types/IMenu";
import SubMenu from "./SubMenu.vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "MyMenu",
  components: { SubMenu },
  props: {
    data: {
      type: Array as PropType<ISubMenu[]>,
      required: true,
    },
  },
  setup(props, { attrs }) {
    const store = useStore();
    const menuActiveIndex = computed(() => store.state.menu.menuActiveIndex);

    return {
      attrs,
      menuActiveIndex,
    };
  },
});
</script>
<style lang="less" scoped>
.horizontal-collapse-transition {
  transition: 0s width ease-in-out, 0s padding-left ease-in-out, 0s padding-right ease-in-out;
}
/deep/ .el-sub-menu.is-active .el-sub-menu__title {
  color: var(--el-color-primary);
}
</style>
