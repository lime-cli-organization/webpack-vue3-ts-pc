<!-- 
	@description: 数据加载按钮封装【操作数据loading状态】
-->
<template>
  <el-button :loading="isLoading" @click="handleClick" v-bind="attrs">
    <slot />
  </el-button>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";

export default defineComponent({
  name: "MyButton",
  props: {
    isAutoLoading: {
      type: Boolean,
      default: false,
    },
  },
  emits: {
    confirmClick: (callback: () => void) => {
      if (typeof callback === "function") {
        return true;
      } else {
        return false;
      }
    },
  },
  setup(props, { emit, attrs }) {
    const state = reactive({
      isLoading: false,
    });
    const handleClick = () => {
      if (props.isAutoLoading) {
        state.isLoading = true;
      }
      emit("confirmClick", () => {
        state.isLoading = false;
      });
    };
    return {
      attrs,
      ...toRefs(state),
      handleClick,
    };
  },
});
</script>
