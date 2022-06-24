<template>
  <div class="chart" :id="container" :ref="setItemRef"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted, toRefs, watch, watchEffect } from "vue";
import * as echarts from "echarts";
import type { ECharts, EChartsOption } from "echarts";
import { merge } from "@/utils/tools";

export default defineComponent({
  name: "MyChart",
  props: {
    container: {
      type: String,
      default: null,
    },
    option: {
      type: Object,
      default: null,
    },
  },
  setup(props) {
    let itemRef: any;
    const setItemRef = (el: any) => {
      if (el) {
        itemRef = el;
      }
      return itemRef;
    };
    const baseOption: EChartsOption = {
      grid: {
        top: "24px",
        left: "24px",
        bottom: "24px",
        right: "24px",
      },
    };

    const { option } = toRefs(props);
    let MyChart: ECharts;
    onMounted(() => {
      MyChart = echarts.init(itemRef);
      MyChart.setOption(merge(baseOption, option.value));
    });
    watchEffect((onInvalidate) => {
      const handerResize = () => {
        MyChart.resize();
      };
      window.addEventListener("resize", handerResize);
      onInvalidate(() => {
        // 执行时机: 在副作用即将重新执行时,如果在setup()或生命周期钩子函数中使用watchEffect, 则在卸载组件时执行此函数。
        window.removeEventListener("resize", handerResize);
      });
    });

    watch(
      option,
      (newVal) => {
        console.log("watch option", newVal);
        MyChart && MyChart.setOption(merge(baseOption, option.value));
      },
      {
        deep: true,
      },
    );

    return {
      setItemRef,
    };
  },
});
</script>

<style lang="less" scoped>
.chart {
  width: 100%;
  height: 100%;
}
</style>
