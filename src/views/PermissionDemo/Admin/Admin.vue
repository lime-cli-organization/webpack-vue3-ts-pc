<template>
  <div>
    <el-button v-permission:auth="[EUserRole.Admin]" v-debounce="deboundClick">这是一个按钮 permission</el-button>
    <el-input v-debounce="deboundClick"></el-input>

    <div class="scroll_box">
      <div class="tag_row" ref="scrollParent">
        <el-icon><arrow-left-bold /></el-icon>
        <div class="tag_content" ref="scrollChild" :style="style">
          <span v-for="item in 7" :key="item" :ref="el => el && itemRefs[i] = el">这是第{{ item + 1 }}个标签</span>
        </div>
        <el-icon class="icon_right" @click="slideRight"><arrow-right-bold /></el-icon>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { EUserRole } from "@/enums/permissionEnum";
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    let style = ref(""); // 动态计算的样式
    const scrollChild = ref<HTMLElement>();
    const scrollParent = ref<HTMLElement>();
    let scrollWidth = 0; // 点击一次按钮滑动的距离
    const itemRefs = ref<Array<HTMLElement>>();
    const slideRight = () => {
      const parent = scrollParent.value?.getBoundingClientRect();
      const child = scrollChild.value?.getBoundingClientRect();

      scrollWidth = parent!.width - child!.width;
      style.value = `transform: translateX(${-150}px);`;
    };
    return { scrollChild, scrollParent, slideRight, style, itemRefs, EUserRole };
  },
  methods: {
    deboundClick() {
      console.log("只触发一次");
    },
  },
});
</script>

<style lang="less" scoped>
.scroll_box {
  width: 400px;
  .tag_row {
    width: 100%;
    display: flex;
    align-items: center;
    overflow: hidden;
    .tag_content {
      flex-shrink: 0;
      width: calc(100% - 34px);
      display: flex;
      transition-duration: 0.3s;
      span {
        flex-shrink: 0;
        line-height: 2;
        border: 1px solid lightblue;
        padding: 0 15px;
      }
    }
  }
}
</style>
