<template>
  <div>
    editor
    <div
      class="part-loading"
      v-loading="isPartLoading"
      element-loading-text="Loading..."
      element-loading-background="rgba(0, 0, 0, 0.8)"
    ></div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const isPartLoading = ref(true);
    setTimeout(() => {
      isPartLoading.value = false;
    }, 3000);
    return {
      isPartLoading,
    };
  },
});
</script>
<style lang="less" scoped>
.part-loading {
  width: 200px;
  height: 200px;
  border: 1px solid lightblue;
}
</style>
