<template>
  <div>
    <p>可拖拽</p>
    <div class="content">
      <textarea class="area">这是一个编辑框</textarea>
      <canvas
        id="myCanvas"
        ref="myCanvas"
        class="area"
        width="460"
        height="240"
        @mousedown="mousedown"
        @mouseup="mouseup"
        @mousemove="mousemove"
      ></canvas>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from "vue";
export default defineComponent({
  setup() {
    const state = reactive({
      x: 0,
      y: 0,
      flag: false,
    });
    const mousedown = (event: MouseEvent) => {
      const { offsetX, offsetY } = event;
      state.flag = true;
      state.x = offsetX;
      state.y = offsetY;
    };
    const mouseup = (event: MouseEvent) => {
      console.log("mouseup");
      state.flag = false;
    };
    const mousemove = (event: MouseEvent) => {
      drawRect(event);
    };
    let myCanvas = ref<HTMLCanvasElement>();
    const drawRect = (event: MouseEvent) => {
      if (state.flag) {
        const { offsetX, offsetY } = event;
        const ctx = myCanvas.value!.getContext("2d") as CanvasRenderingContext2D;
        const x = state.x;
        const y = state.y;
        ctx?.clearRect(0, 0, myCanvas.value!.width, myCanvas.value!.height);
        ctx?.beginPath();
        ctx.strokeStyle = "#00ff00";
        ctx.lineWidth = 1;
        ctx.strokeRect(x, y, offsetX - x, offsetY - y);
      }
    };
    return {
      ...toRefs(state),
      myCanvas,
      mousedown,
      mouseup,
      mousemove,
    };
  },
});
</script>
<style lang="less" scoped>
.content {
  display: flex;
  flex-direction: row;
  .area {
    width: 460px;
    height: 460px;
    border: 1px solid;
    overflow: scroll;
  }
}
</style>
