<template>
  <div class="login">
    <!-- 左侧区域 -->
    <div class="left-side"></div> <!-- 修改：添加了左侧区域 div -->

    <div class="right-side"> <!-- 修改：添加了右侧区域 div -->
      <div class="board">
        <!--添加标题和logo-->
        <div class="header">
          <img src="@/assets/image/logo.png" alt="Logo" class="logo" />
          <span class="title">登陆系统</span>
        </div>

        <el-form :model="form" label-width="120px">
          <el-form-item label="">
            <el-input v-model="form.admin" />
          </el-form-item>

          <el-form-item label="">
            <el-input v-model="form.password" type="password" />
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="onSubmit">登录</el-button>
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

const form = reactive({
  admin: "",
  password: "",
})

const router = useRouter();

const onSubmit = () => {
  if (form.admin === "student" && form.password === "111111") {
    router.push('/function2');
    ElMessage.success('登录成功');
  } else {
    ElMessage.error('用户名或密码错误');
  }
}
</script>

<style lang="scss" scoped>
.login {
display: flex; /* 修改：使用flex布局 */
height: 100vh;
background-image: url('@/assets/image/background.png');
background-size: cover;
background-position: center;

/* 左侧区域，占30%宽度 */
.left-side { /* 修改：添加左侧区域的样式 */
  flex: 1; /* 左侧占30%宽度 */
}

/* 右侧区域，占70%宽度 */
.right-side { /* 修改：添加右侧区域的样式 */
  flex: 2; /* 右侧占70%宽度 */
  display: flex;
  justify-content: center; /* 横向居中 */
  align-items: center; /* 垂直居中 */
  margin-left: 400px; /* 修改：向右偏移500px */
}

.board {
  background-image: url('@/assets/image/board.png');
  background-size: cover; /* 让背景图完全覆盖 */
  background-repeat: no-repeat; /* 不重复背景图 */
  width: 70%; /* 修改：宽度占右侧区域的70% */
  height: 70%; /* 修改：高度占右侧区域的70% */
  padding: 30px; /* 内边距，确保输入框和按钮有空间 */
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  /* 修改：使用 flex 布局确保 logo 和标题居中 */
  display: flex;
  flex-direction: column; /* 使 logo 和标题垂直排列 */
  justify-content: center; /* 垂直居中 */
  align-items: center; /* 水平居中 */
}

  /* 新增的样式：标题和Logo */
.header {
  display: flex;
  align-items: center;
  margin-bottom: 20px; /* 为标题和表单之间添加间距 */
}

.logo {
  width: 100px; /* 设置logo的大小 */
  height: 100px;
  margin-right: 30px; /* logo与标题之间的间距 */
}

.title {
  font-size: 35px;
  font-weight: bold;
  color: #333;
}
}
</style>
