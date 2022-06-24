<!-- 
	@description: 表格封装【多选翻页 状态保留】
-->
<template>
  <el-table :data="data" ref="multipleTable" :row-key="idKey" @selection-change="handleSelectionChange">
    <el-table-column v-if="needSelect" type="selection" width="55"></el-table-column>
    <slot />
  </el-table>
  <!-- 分页 -->
  <el-pagination
    v-if="needPagination"
    :current-page="pagination.currentPage"
    layout="total, prev, pager, next, jumper"
    :total="pagination.total"
    @current-change="handlePageChange"
  ></el-pagination>
</template>
<script lang="ts">
import { arrUnique } from "@/utils/tools";
import type { ElTable } from "element-plus";
import { defineComponent, onMounted, reactive, ref, toRefs } from "vue";

export default defineComponent({
  name: "MyTable",
  emits: ["pageChange", "checkChange"],
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    // 列表数据唯一值
    idKey: {
      type: String,
      required: true,
    },
    // 是否需要选择
    needSelect: {
      type: Boolean,
      default: false,
    },
    // 是否需要分页
    needPagination: {
      type: Boolean,
      default: false,
    },
    pagination: {
      type: Object,
      default: () => {
        return {
          total: 0,
          currentPage: 1,
          pageSize: 10,
        };
      },
    },
    // 所有选中的数据
    allSelection: {
      type: Array,
      default: () => [],
    },
  },
  setup(props, { emit, attrs }) {
    // 表格实例
    const multipleTable = ref<InstanceType<typeof ElTable>>();
    // 实例化组件时 对比所有选中的行数据和当前页的数据，设置当前页的选中状态
    onMounted(() => {
      setCheck();
    });
    // 翻页
    const handlePageChange = (currentPage: number) => {
      emit("pageChange", currentPage);
      setTimeout(() => {
        setCheck();
      }, 500);
    };
    // 设置当前页的选中状态
    const setCheck = () => {
      const pageData = props.data;
      const allSelectionId = props.allSelection.map((item: any) => item[props.idKey]);
      let empty = [];
      pageData
        .filter((item: any) => allSelectionId.indexOf(item[props.idKey]) > -1)
        .forEach((item: any) => {
          empty.push(item);
          multipleTable.value!.toggleRowSelection(item, true);
        });
    };

    // 选择项发生改变 更新所有选中的行数据 allSelection
    let state = reactive({
      pageSelection: [] as any[],
    });
    const handleSelectionChange = (selection: any) => {
      state.pageSelection = selection;
      const backData = changePageCoreRecordData();
      emit("checkChange", backData);
    };

    const changePageCoreRecordData = () => {
      let backData: any[] = [];
      const _allSelection = props.allSelection;
      const _data = props.data;
      const pageSelection = state.pageSelection;
      // 没有选择的数据，直接取当前页选中的数据
      if (_allSelection.length === 0) {
        backData = pageSelection;
      } else {
        backData = _allSelection;
        // 总选择key集合
        let selectionIds: any = [], // 当前页选择key集合
          noSelectionIds: any = []; // 当前页未选择key集合
        selectionIds = pageSelection.map((item: any) => item[props.idKey]);
        // 当前页未选择key集合
        noSelectionIds = _data
          .filter((item: any) => selectionIds.indexOf(item[props.idKey]) < 0)
          .map((item: any) => item[props.idKey]);
        // 总选中数据 + 当前页选中数据 去重
        backData = arrUnique([...backData, ...pageSelection], props.idKey);
        // 取消未选中的数据
        backData.forEach((id: any) => {
          for (let i = 0; i < noSelectionIds.length; i++) {
            if (noSelectionIds[i][props.idKey] == id) {
              // 如果总选择中有未被选中的，那么就删除这条
              backData.splice(i, 1);
            }
          }
        });
      }
      return backData;
    };

    return {
      ...toRefs(state),
      multipleTable,
      handlePageChange,
      handleSelectionChange,
    };
  },
});
</script>
<style lang="less" scoped>
.el-pagination {
  text-align: center;
  margin-top: 24px;
}
</style>
