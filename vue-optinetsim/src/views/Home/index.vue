<template>
    <div class="home-container">
        <div class="background"> <!-- 添加背景图的容器 -->
            <div class="content">
                <!-- Logo -->
                <div class="logo">
                    <!-- <img src="@/assets/image/logo.png" alt="Logo" /> -->
                </div>
                <!-- Title -->
                <h1 class="home-title">
                    多波段光网络<br />
                    智能仿生平台
                </h1>
            </div>
            <div class="buttons">
                <button class="login-button learn-button" @click="navigateToFunction1">学习使用</button>
                <button class="login-button login-action-button" @click="navigateToLogin">点击登录</button>
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
    width:100%;
    margin:0;
    padding:0;
    overflow: hidden;
    /* padding-top: 10vh; 使标题位置靠上 */
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
    height: 120px; /* 设置 logo 的高度 */
    margin-right: 40px; /* logo 和标题之间的间距 */
    margin-top:2rem;
    background-color: transparent; /* 确保背景是透明的 */
}

.home-title {
    font-size: 2.5rem;
    font-weight: 500; /* 字体粗细，700为加粗（bold），400为正常 */
    margin-top:4rem;
    margin-bottom: 1.5rem; /* 标题和按钮之间的间距 */
}

.buttons {
    display: flex;
    justify-content: center; /* 按钮水平居中 */
    gap: 60px; /* 按钮之间的间距 */
    margin-top: 10rem; /* 增加与标题的间隔，使按钮整体下移 */
}


.login-button {
    font-size: 2rem; /* 增大按钮文字 */
    padding: 1.5rem 4rem; /* 增大按钮尺寸 */
    cursor: pointer;
    border: none;
    border-radius: 4px; /* 圆角效果增强 */
    transition: background-color 0.3s ease, color 0.3s ease; /* 增加平滑过渡效果 */
}

.learn-button{
    background-color: #F3F6E9;
    color: #F7881A;
}

.learn-button:hover {
    background-color: #ebeee6;
}

.login-action-button{
    background-color: #F7881A;
    color: #F3F6E9;
}

.login-action-button:hover {
    background-color: #e8811a;
}

</style>
