<template>
  <div>
    <MyDownload
      url="http://121.43.163.227:8001/api/ChartLeaderExam/ExportExamChartData"
      :params="params"
      size="small"
      @downloaded="downloadDone"
    >
      导出
    </MyDownload>
    <el-button @click="isDialogVisible = true">打开</el-button>
    <MyDialog
      width="600px"
      v-model="isDialogVisible"
      title="登录"
      tip="(这是一个提示)"
      :showRightButton="true"
      :showFooter="true"
      @close="onReset"
      @confirm="onSubmit"
    >
      <template v-slot:headerRight>
        <MyButton type="primary" size="small" :isAutoLoading="true" @confirmClick="onSubmit">好了丫</MyButton>
      </template>
      <el-form
        :model="form"
        ref="loginForm"
        :rules="formRule"
        label-width="80px"
        status-icon
        :inline="false"
        size="normal"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" type="text" clearable></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" type="password" clearable></el-input>
        </el-form-item>
      </el-form>
      <template v-slot:footer>
        <el-button @click="onReset">不要</el-button>
        <MyButton type="primary" :isAutoLoading="true" @confirmClick="onSubmit">好的</MyButton>
      </template>
    </MyDialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import MyDialog from "@/components/basic/MyDialog.vue";
import MyButton from "@/components/basic/MyButton.vue";
import MyDownload from "@/components/basic/MyDownload.vue";
import { setCookie } from "@/utils/cookieUtil";
import { EUserRole } from "@/enums/permissionEnum";

export default defineComponent({
  components: { MyButton, MyDialog, MyDownload },
  name: "Single",
  setup() {
    let isDialogVisible = ref(false);
    const form = reactive({
      username: "",
      password: "",
    });
    const formRule = reactive({
      username: [{ required: true, message: "请填写用户名", trigger: "blur" }],
      password: [{ required: true, message: "请填写密码", trigger: "blur" }],
    });
    const router = useRouter();
    const onSubmit = async (callback: () => void) => {
      setTimeout(() => {
        callback();
        // setCookie("token", JSON.stringify({ roles: [EUserRole.Admin, EUserRole.Editor] }));
        isDialogVisible.value = false;
        router.push({
          path: "/home",
        });
      }, 1000);
    };
    const onReset = () => {
      isDialogVisible.value = false;
    };

    const params = reactive({
      schoolId: "",
      grade: "六年级",
      term: "2021上",
      paperId: 1158,
      start: 10,
      end: 10,
    });
    const downloadDone = (data: Record<string, any>) => {
      console.log(data);
    };
    return {
      isDialogVisible,
      form,
      formRule,
      onSubmit,
      onReset,

      params,
      downloadDone,
    };
  },
});
</script>

<style lang="less" scoped>
.login_form {
  width: 480px;
  height: 360px;
  margin: 15vh auto;
}
</style>
