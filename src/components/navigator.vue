<script setup>
import { useRouter } from 'vue-router'; // 导入 Vue Router

const router = useRouter(); // 使用 useRouter 获取路由实例
const id = localStorage.getItem('id');

// 退出登录后的处理函数
const handleLogout = () => {
  localStorage.removeItem('id'); // 清除 localStorage 中的 id
  router.push('/login'); // 跳转到登录页
};
</script>

<template>
  <nav class="app-topnav">
    <div class="container">
      <div id="t1">多波段光网络</div>
      <div id="t2">智能模拟工具</div>
      <ul>
        <!-- 多模版渲染 区分登录状态和非登录状态 -->

        <!-- 适配思路: 登录时显示第一块 非登录时显示第二块  是否有token -->
        <template v-if="true">
          <li><a href="javascript:;"><i class=" iconfont icon-user"></i>{{ id }}</a></li>
          <li>
            <el-popconfirm
              title="确认退出吗?"
              confirm-button-text="确认"
              cancel-button-text="取消"
              @confirm="handleLogout"
            >
              <template #reference>
                <a href="javascript:;">退出登录</a>
              </template>
            </el-popconfirm>
          </li>
        </template>
        <template v-else>
          <li><a href="javascript:;">请先登录</a></li>
          <li><a href="javascript:;">帮助中心</a></li>
          <li><a href="javascript:;">关于我们</a></li>
        </template>
      </ul>
    </div>
  </nav>
</template>


<style scoped lang="scss">
.app-topnav {
  background: #F3F6E9;

  #t1{
      color: #2C2A2F;
      padding: 0 15px;
      font-size: 16px;
      justify-content: flex-start;

    }

    #t2{
      color: #F7881A;
      padding: 0 840px 0 0px;
      font-size: 16px;
      justify-content: flex-start;

    }

  .container {
    display: flex;
    height: 36px;
    align-items: center;
    justify-content: flex-start;


    ul{
      display: flex;
    height: 36px;
    align-items: center;
    li {
      a {
        padding: 0 15px;
        color: #2C2A2F;
        line-height: 1;
        display: inline-block;

        i {
          font-size: 14px;
          margin-right: 2px;
        }

        &:hover {
          color: $xtxColor;
        }
      }

      ~li {
        a {
          border-left: 2px solid #2C2A2F;
        }
      }
    }
  }
}
}

</style>
