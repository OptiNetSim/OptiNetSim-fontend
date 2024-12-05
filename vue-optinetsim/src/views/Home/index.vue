<template>
    <div class="home-container">
        <div class="background"> <!-- 添加背景图的容器 -->
            <div class="content">
                <!-- Logo -->
                <div class="logo">
                    <img src="@/assets/image/logo.png" alt="Logo" />
                </div>
                <!-- Title -->
                <h1 class="home-title">
                    多波段光网络<br />
                    智能仿生平台
                </h1>
            </div>
            <div class="buttons">
                <button class="login-button" @click="navigateToFunction1">学习使用</button>
                <button class="login-button" @click="navigateToLogin">点击登录</button>
            </div>
        </div>
    </div>
</template>

<script>
import { useRouter } from 'vue-router'

export default {
    name: 'Home',
    setup() {
        const router = useRouter()

        const navigateToFunction1 = () => {
            router.push('/function1')  // 跳转到 function1 页面
        }

        const navigateToLogin = () => {
            router.push('/login')  // 跳转到 login 页面
        }

        return {
            navigateToFunction1,
            navigateToLogin
        }
    }
}
</script>

<style scoped>
.home-container {
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
height: 100vh;
padding-top: 10vh; /* 使标题位置靠上 */
text-align: center;
}

.background {
background-image: url('@/assets/image/background2.png'); /* 设置背景图 */
background-size: cover; /* 背景图覆盖整个容器 */
background-position: center; /* 背景图居中显示 */
width: 100%;
height: 100%;
display: flex;
flex-direction: column;
justify-content: center;
}

.content {
display: flex;
align-items: center;
justify-content: center;
}

.logo img {
  height: 100px; /* 设置 logo 的高度 */
  margin-right: 20px; /* logo 和标题之间的间距 */
}

.home-title {
font-size: 2.5rem;
margin-bottom: 2rem; /* 标题和按钮之间的间距 */
}

.buttons {
display: flex;
gap: 20px; /* 按钮之间的间距 */
}

.login-button {
font-size: 1rem;
padding: 0.5rem 1rem;
cursor: pointer;
border: none;
background-color: #007BFF;
color: white;
border-radius: 4px;
}

.login-button:hover {
background-color: #0056b3;
}
</style>
