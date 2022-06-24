<template>
  <template v-for="item in data" :key="item.id">
    <template v-if="item.children">
      <el-sub-menu :index="item.id + ''" v-permission="item.userRole">
        <template #title>
          <el-icon v-if="item.icon"><component :is="item.icon"></component></el-icon>
          <span>{{ item.title }}</span>
        </template>
        <SubMenu v-if="item.children" :data="item.children" />
      </el-sub-menu>
    </template>
    <template v-else>
      <el-menu-item :key="item.id" :index="item.path" v-permission="item.userRole" @click="navigationTo(item)">
        <el-icon v-if="item.icon"><component :is="item.icon"></component></el-icon>
        <span>{{ item.title }}</span>
      </el-menu-item>
    </template>
  </template>
</template>
<script lang="ts">
import { IMenuItem } from "@/api/types/IMenu";
import { defineComponent, toRefs } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default defineComponent({
  name: "SubMenu",
  props: {
    data: {
      required: true,
      type: Object,
      default: () => null,
    },
  },
  setup(props) {
    const { data } = toRefs(props);
    const router = useRouter();
    const store = useStore();
    const navigationTo = (item: IMenuItem) => {
      // router.push({
      //   path: item.path as string,
      // });
      store.commit("setMenuActivePath", item.path);
    };
    return {
      menu: data,
      navigationTo,
    };
  },
});
</script>
