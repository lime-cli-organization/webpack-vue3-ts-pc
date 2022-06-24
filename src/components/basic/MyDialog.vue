<!-- 
	@description: 弹窗
-->
<template>
  <el-dialog custom-class="my_dialog" v-bind="attrs" @close="close">
    <template v-slot:title>
      <div class="dialog_header">
        <span class="title">{{ title }}</span>
        <span class="tip">{{ tip }}</span>
        <div class="header_right" v-if="showRightButton">
          <slot name="headerRight">
            <MyButton type="primary" size="small" :isAutoLoading="true" @confirmClick="confirm">完成选择</MyButton>
          </slot>
        </div>
      </div>
    </template>
    <slot />
    <template v-if="showFooter" v-slot:footer>
      <slot name="footer" class="dialog_footer">
        <el-button @click="close">取消</el-button>
        <MyButton type="primary" :isAutoLoading="true" @confirmClick="confirm">保存</MyButton>
      </slot>
    </template>
  </el-dialog>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import MyButton from "@/components/basic/MyButton.vue";

export default defineComponent({
  name: "MyDialog",
  components: { MyButton },
  props: {
    title: {
      type: String,
      required: true,
    },
    tip: {
      type: String,
    },
    showRightButton: {
      type: Boolean,
      default: false,
    },
    showFooter: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit, attrs }) {
    const close = () => {
      emit("close");
    };
    const confirm = (callback: () => void) => {
      emit("confirm", () => {
        callback();
      });
    };
    return {
      attrs,
      close,
      confirm,
    };
  },
});
</script>
<style lang="less" scoped>
.dialog_header {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-content: center;
  align-items: center;
  .header_right {
    margin: 0 36px 0 auto;
  }
  .title {
    display: inline-block;
    line-height: 24px;
    font-size: 18px;
    font-weight: bold;
    color: #303133;
    margin-right: 12px;
  }
  .tip {
    font-size: 14px;
    color: #c6c6c6;
  }
}
</style>
<style lang="less">
.my_dialog .el-dialog__header {
  height: 65px;
  box-sizing: border-box;
  border-bottom: 1px solid #ebeef5;
  padding: 20px;
}
.my_dialog .el-dialog__headerbtn {
  top: 28px;
}
.my_dialog .el-dialog__body {
  padding: 20px 20px 0;
}
.my_dialog .el-dialog__footer {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
