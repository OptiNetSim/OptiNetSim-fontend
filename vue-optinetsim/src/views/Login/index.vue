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
          <el-form-item>
            <el-input v-model="form.admin" placeholder="输入用户名"/>
          </el-form-item>

          <el-form-item>
            <el-input v-model="form.password" type="password" placeholder="输入密码"/>
          </el-form-item>

          <el-row class="action-row" justify="start" align="middle">
            <el-button type="text" class="action-button" @click="onRegister">注册</el-button>
            <el-button type="text" class="action-button" @click="onForgetPassword">忘记密码</el-button>
          </el-row>
          
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
    // ElMessage.success('登陆成功');
  } else {
    ElMessage.error('用户名或密码错误');
  }
//   // 注册按钮的点击事件
// const onRegister = () => {
//   ElMessage.info('跳转到注册页面');
// }

// // 忘记密码按钮的点击事件
// const onForgetPassword = () => {
//   ElMessage.info('跳转到忘记密码页面');
// }
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
  height: 90px;
  margin-right: 30px; /* logo与标题之间的间距 */
  background-color: transparent; /* 确保背景是透明的 */

  position: relative; /* 设置为relative来保持容器布局 */
  top: -30px; /* 向上移动logo */
}

.title {
  font-size: 30px;
  font-weight: 500;
  color: #333;
  margin-top: -60px;
  margin-right: 30px;
}

/* 使输入框居中 */
.el-form-item {
  width: 100%;
  margin-bottom: 20px;
  display: flex;
  justify-content: center; /* 修改：居中对齐 */
  }

.el-input {
  width: 300px; /* 修改：输入框宽度设置为80% */
  height: 40px;
  margin-left: -100px;
  .el-input__inner {
  background-color: #b4b2b2 !important; /* 设置输入框内部背景颜色为灰色 */
    }
  }





.el-button{
  padding: 15px 30px; /* 增大按钮的内边距 */
  font-size: 18px; /* 增加字体大小 */
  height: 40px; /* 设置按钮高度 */
  width:150px;
  margin-left: -30px;
  margin-top: 30px;
}
.action-row {
    width: 100%;
    margin-top: 10px;
    display: flex;  /* 新增：使用flex布局 */
    justify-content: start;  /* 新增：按钮靠左排列 */
    gap: 120px; /* 新增：按钮之间的间距 */
    margin-top: -40px;
  }

  .action-button {
    font-size: 14px;
    color: #F7881A;
  }

  .action-button:hover {
    text-decoration: underline;
  }

}
</style>
