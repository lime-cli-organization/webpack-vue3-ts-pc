<template>
  <div>
    <el-form :model="form" ref="loginFormRef" :rules="formRule" label-width="80px" status-icon size="normal">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username" type="text" clearable></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" type="password" clearable></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="code">
        <el-input v-model="form.code" clearable @keyup.enter="onSubmit"></el-input>
      </el-form-item>
      <img class="verify-code" :src="`data:${imageObj.contentType};base64,${imageObj.fileContents}`" alt="" />
      <el-form-item>
        <MyButton :isAutoLoading="true" @confirmClick="onSubmit" type="primary">Submit</MyButton>
        <el-button>Reset</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import MyButton from "@/components/basic/MyButton.vue";
import { setCookie } from "@/utils/cookieUtil";
import { verifyPassword, verifyUsername } from "@/utils/validate";
import type { ElForm } from "element-plus";
import { DoLogin, GetImage } from "@/api/authorization";
import jwt from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken";

import { GetImage as GetImage1 } from "@/api/user";

export default defineComponent({
  name: "Login",
  components: { MyButton },
  setup() {
    GetImage1();
    const router = useRouter();
    // 验证码
    const imageObj = ref({ fileContents: "", contentType: "", key: "" });
    const getImage = async () => {
      const {
        data: {
          image: { fileContents, contentType },
          key,
        },
      } = await GetImage();
      return {
        fileContents,
        contentType,
        key,
      };
    };
    onMounted(async () => {
      imageObj.value = await getImage();
    });
    // 登录
    const formState = reactive({
      form: { username: "", password: "", code: "" },
      formRule: {
        username: [{ required: true, validator: verifyUsername, trigger: "blur" }],
        password: [{ required: true, validator: verifyPassword, trigger: "blur" }],
        code: [{ required: true, message: "请填写验证码", trigger: "blur" }],
      },
    });
    type FormInstance = InstanceType<typeof ElForm>;
    const loginFormRef = ref<FormInstance>();
    const onSubmit = async (hideLoading: () => void) => {
      await handleLogin();
      hideLoading();
    };
    const handleLogin = async () => {
      loginFormRef.value?.validate(async (valid: any) => {
        if (!valid) return false;
        const { data } = await DoLogin({
          ...formState.form,
          key: imageObj.value.key,
        });
        setCookie("token", data);
        const token = jwt.decode(data) as JwtPayload;
        // 不同用户进入页面不一样，设置不同的path
        const pathReflect: Record<string, string> = {
          admin: "/dashboard/dashboard",
        };
        router.push({
          path: pathReflect[token["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"]],
        });
      });
    };
    return {
      loginFormRef,
      ...formState,
      imageObj,
      onSubmit,
    };
  },
});
</script>

<style lang="less" scoped>
.el-form {
  width: 480px;
  height: 360px;
  margin: 15vh auto;
}
.verify-code {
  width: 200px;
  height: 80px;
  border: 1px solid;
}
</style>
