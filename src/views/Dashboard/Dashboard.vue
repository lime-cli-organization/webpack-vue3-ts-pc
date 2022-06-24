<template>
  <div>
    <SvgIcon iconName="home" :size="32" />
    <SvgIcon iconName="2" color="#ccccdd" />
    <SvgIcon iconName="home_fill" color="#ff7f50" />
    <SvgIcon iconName="home_fill" color="#00008b" />

    <div class="chart-container">
      <MyChart container="chart1" :option="option" />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, reactive } from "vue";
import MyChart from "@/components/basic/MyChart.vue";
export default defineComponent({
  name: "Dashboard",
  components: {
    MyChart,
  },
  setup() {
    let option = reactive({
      xAxis: {
        data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
      },
      yAxis: {},
      series: [
        {
          name: "销量",
          type: "bar",
          data: [5, 20, 36, 10, 10, 20],
        },
      ],
    });
    setTimeout(() => {
      option.series[0].data = [50, 20, 36, 10, 10, 20];
    }, 1000);
    return {
      option,
    };
  },
});
</script>
<style lang="less" scoped>
.chart-container {
  width: 30vw;
  height: 50vh;
  border: 1px solid lightskyblue;
}
</style>
