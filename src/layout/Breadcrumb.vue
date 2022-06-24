<template>
  <div class="breadcrumb">
    <el-icon size="16"><arrow-left-bold /></el-icon>
    <el-tag
      :ref="setBreadcrumbRef"
      class="mx-1"
      size="large"
      closable
      effect="plain"
      @click="navigateTo"
      @close="navigateClose"
      @contextmenu.prevent="openMenu($event)"
    >
      Large
    </el-tag>
    <el-icon size="16"><arrow-right-bold /></el-icon>
  </div>
  <!-- <div class="menuContext" :style="`position: absolute; z-index: 99; left: ${style.left}px; top: ${style.top}px`">
    <ul>
      <li>这是一条数据</li>
      <li>这是一条数据</li>
      <li>这是一条数据</li>
    </ul>
  </div> -->
</template>
<script lang="ts">
import { offset } from "@popperjs/core";
import type { Tag } from "element-plus";
import { defineComponent, reactive, ref, toRefs } from "vue";

export default defineComponent({
  name: "Breadcrumb",
  setup() {
    const navigateTo = () => {
      console.log("navigateTo");
    };
    const navigateClose = () => {
      console.log("navigateClose");
    };
    let breadcrumbRef: any;
    const setBreadcrumbRef = (el: any) => {
      if (el) {
        breadcrumbRef = el;
      }
      return breadcrumbRef;
    };
    const state = reactive({
      style: {
        top: 0,
        left: 0,
      },
    });
    const openMenu = (event: PointerEvent) => {
      state.style = {
        top: event.clientY,
        left: event.clientX,
      };
    };
    return {
      setBreadcrumbRef,
      ...toRefs(state),
      navigateTo,
      navigateClose,
      openMenu,
    };
  },
});
</script>
<style lang="less" scoped>
.breadcrumb {
  background-color: lightblue;
  display: flex;
  align-items: center;
}
.el-icon {
  padding: 0 8px;
}
.el-tag--plain {
  border-radius: 0;
  border: none;
}
</style>
