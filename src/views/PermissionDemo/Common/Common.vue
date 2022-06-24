<template>
  <div>
    <MyTable
      :data="tableData"
      idKey="Id"
      :needSelect="true"
      :needPagination="true"
      :pagination="pagination"
      :allSelection="allSelection"
      @pageChange="pageChange"
      @checkChange="checkChange"
    >
      <el-table-column prop="PaperName" label="PaperName" />
      <el-table-column prop="SchoolName" label="SchoolName" />
      <el-table-column prop="Grade" label="Grade" width="120" />
      <el-table-column prop="Num" label="Num" width="80" />
      <el-table-column prop="StudentName" label="StudentName" width="120" />
    </MyTable>
  </div>
</template>
<script lang="ts">
import { GetAdminInsideSchool } from "@/api/business";
import MyTable from "@/components/basic/MyTable.vue";
import { defineComponent, onMounted, reactive, toRefs } from "vue";

export default defineComponent({
  components: { MyTable },
  setup() {
    const state = reactive({
      tableData: [],
      pageSelection: [], // 当前页选中的row
      allSelection: [] as any[], // 所有选中的row
      pagination: {
        total: 0,
        currentPage: 1,
        pageSize: 10,
      },
    });
    onMounted(async () => {
      getAdminInsideSchool();
    });
    const getAdminInsideSchool = async () => {
      const { data, total } = await GetAdminInsideSchool({ page: state.pagination.currentPage });
      state.tableData = data;
      state.pagination.total = total as number;
    };
    // 翻页
    const pageChange = (currentPage: number) => {
      state.pagination.currentPage = currentPage;
      getAdminInsideSchool();
    };
    const checkChange = (allSelection: any[]) => {
      state.allSelection = allSelection;
    };

    return {
      ...toRefs(state),
      pageChange,
      checkChange,
    };
  },
});
</script>
