<template>
  <el-container>
    <el-aside :width="isCollapse ? '64px' : '256px'">
      <MyMenu :data="menuList" :collapse="isCollapse"></MyMenu>
    </el-aside>
    <el-container>
      <MyHeader />
      <Breadcrumb />
      <el-main class="content">
        <router-view />
      </el-main>
      <el-footer>
        <MyFooter />
      </el-footer>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useRouter } from "vue-router";
import MyFooter from "@/layout/MyFooter.vue";
import MyMenu from "@/layout/MyMenu/MyMenu.vue";
import { menuList } from "@/mock/data/user";
import MyHeader from "@/layout/MyHeader.vue";
import { useStore } from "vuex";
import Breadcrumb from "@/layout/Breadcrumb.vue";

export default defineComponent({
  components: { MyMenu, MyFooter, MyHeader, Breadcrumb },
  name: "Home",
  setup() {
    const router = useRouter();
    const store = useStore();
    const isCollapse = computed(() => store.state.menu.isCollapse);

    return {
      menuList,
      isCollapse,
    };
  },
});
</script>
<style lang="less">
.el-main {
  min-height: calc(100vh - 120px);
  position: relative;
  background-color: #f0f2f5;
}
.el-footer,
.el-header {
  display: flex;
  align-items: center;
}
</style>
