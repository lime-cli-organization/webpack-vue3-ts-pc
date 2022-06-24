<template>
  <!-- 图标只能为单色填充设置颜色才生效 设置color默认为主题色  -->
  <svg :class="svgClass">
    <use
      :xlink:href="`#icon-${props.iconName}`"
      :style="`color:${props.color}; fill:${props.color}; stroke:${props.color}`"
    />
  </svg>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";

export default defineComponent({
  name: "SvgIcon",
  props: {
    iconName: {
      type: String,
      required: true,
    },
    className: {
      type: String,
      default: "",
    },
    color: {
      type: String,
      default: "#409eff",
    },
  },
  setup(props) {
    const svgClass = computed(() => {
      if (props.className) {
        return "svg-icon " + props.className;
      } else {
        return "svg-icon";
      }
    });
    return {
      props,
      svgClass,
    };
  },
});
</script>
<style scoped>
.svg-icon {
  width: 2em;
  height: 2em;
  vertical-align: -0.15em;
  fill: currentColor;
  stroke: currentColor;
  overflow: hidden;
}
</style>
