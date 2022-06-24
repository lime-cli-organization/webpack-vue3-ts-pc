<template>
  <el-header>
    <div class="left">
      <el-icon @click="toggleCollapse" size="24"><component :is="toggleIcon"></component></el-icon>
    </div>
    <div class="right">
      <el-avatar :size="64" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
    </div>
  </el-header>
</template>
<script lang="ts">
import { Expand, Fold } from "@element-plus/icons";
import { computed, defineComponent, ref } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const store = useStore();
    const isCollapse = computed(() => {
      return store.state.menu.isCollapse;
    });
    const toggleIcon = computed(() => {
      return isCollapse.value ? Fold : Expand;
    });
    const toggleCollapse = () => {
      store.commit("setCollapse", !isCollapse.value);
    };
    return {
      store,
      isCollapse,
      toggleCollapse,
      toggleIcon,
    };
  },
});
</script>

<style lang="less" scoped>
.el-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
