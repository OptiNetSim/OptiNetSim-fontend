<template>
  <div class="login">
    <!-- 左侧区域 -->
    <div class="left-side"></div>

    <div class="right-side">
      <div class="board">
        <div class="header">
          <img src="@/assets/logo.svg" alt="Logo" class="logo" />
          <span class="title">注册系统</span>
        </div>

        <el-form :model="form" label-width="120px">
          <el-form-item>
            <el-input v-model="form.name" placeholder="输入姓名" />
          </el-form-item>

          <el-form-item>
            <el-input v-model="form.email" placeholder="输入邮箱" />
          </el-form-item>

          <el-form-item>
            <el-input v-model="form.password" type="password" placeholder="输入密码" />
          </el-form-item>

          <el-form-item>
            <el-input v-model="form.confirmPassword" type="password" placeholder="确认密码" />
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="onRegister">注册</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { ElMessage } from 'element-plus';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { getRegisterAPI } from '@/api/login'

const form = reactive({
  name: "",
  email: "",
  password: "",
  confirmPassword: ""
})

const router = useRouter();

// 注册提交事件
const onRegister = async () => {
  if (form.password !== form.confirmPassword) {
    ElMessage.error('密码和确认密码不一致');
    return;
  }
  try {
    const response = await getRegisterAPI(form.name, form.password, form.email);
    // 处理返回的响应
    if (response.msg === 'User created successfully') {
      ElMessage.success('注册成功');
      router.push('/login'); // 假设注册成功后跳转到登录页面
    } else {
      ElMessage.error('注册失败');
    }
  } catch (error) {
    ElMessage.error('请求失败，请稍后再试');
  }

  router.push('/login'); // 假设注册成功后跳转到登录页面
}

</script>

<style lang="scss" scoped>
.login {
  display: flex;
  height: 100vh;
  background-image: url('@/assets/image/background.png');
  background-size: cover;
  background-position: center;

  /* 左侧区域，占30%宽度 */
  .left-side {
    flex: 1;
  }

  /* 右侧区域，占70%宽度 */
  .right-side {
    flex: 2;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 400px;
  }

  .board {
    background-image: url('@/assets/image/board.png');
    background-size: cover;
    background-repeat: no-repeat;
    width: 70%;
    height: 70%;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .header {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }

  .logo {
    width: 100px;
    height: 90px;
    margin-right: 30px;
    background-color: transparent;
    position: relative;
    top: -30px;
  }

  .title {
    font-size: 30px;
    font-weight: 500;
    color: #333;
    margin-top: -60px;
    margin-right: 30px;
  }

  .el-form-item {
    width: 100%;
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
  }

  .el-input {
    width: 300px;
    height: 40px;
    margin-left: -100px;
  }

  .el-button {
    padding: 15px 30px;
    font-size: 18px;
    height: 40px;
    width: 150px;
    margin-left: -30px;
    margin-top: 30px;
  }
}
</style>
