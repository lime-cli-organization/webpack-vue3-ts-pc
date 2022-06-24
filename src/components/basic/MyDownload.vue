<!-- 
	@description: 数据导出按钮
-->
<template>
  <el-button @click="confirm" v-bind="attrs" :icon="Download" :loading="isDownLoading">
    <slot>下载</slot>
  </el-button>
</template>
<script lang="ts">
import { Download } from "@element-plus/icons";
import { defineComponent, ref, toRefs } from "vue";
import { translateParams } from "@/utils/tools.ts";
import axios from "axios";

export default defineComponent({
  name: "MyDownload",
  props: {
    url: {
      type: String,
      required: true,
    },
    params: {
      type: Object,
      default: () => null,
    },
    fileName: {
      type: String,
      default: () => {
        return new Date().getTime();
      },
    },
    blobType: {
      type: String,
      default: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    },
  },
  setup(props, { emit, attrs }) {
    const isDownLoading = ref(false);
    const { url, params, blobType, fileName } = toRefs(props);
    const suffix = ref(".xlsx");
    const confirm = async () => {
      let requestUrl = params ? `${url.value}?${translateParams(params.value)}` : url.value;
      isDownLoading.value = true;
      try {
        let { data } = await axios.get(requestUrl, {
          responseType: "blob",
        });
        // 文件流转文件
        const blob = new Blob([data], {
          type: blobType.value,
        });
        const downloadElement = document.createElement("a");
        const href = window.URL.createObjectURL(blob); // 创建下载的链接
        downloadElement.href = href;
        downloadElement.download = fileName.value; // 下载后文件名
        document.body.appendChild(downloadElement);
        downloadElement.click(); // 点击下载
        document.body.removeChild(downloadElement); // 下载完成移除元素
        window.URL.revokeObjectURL(href); // 释放掉blob对象
        // 下载完成
        isDownLoading.value = false;
        emit("downloaded", data);
      } catch (error) {
        isDownLoading.value = false;
        emit("downloaded", error);
      }
    };

    return { Download, isDownLoading, suffix, confirm, attrs };
  },
});
</script>
