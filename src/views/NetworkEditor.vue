<template>
  <div class="nav-container">
    <navigator />
  </div>
  <div class="header">
  <div class="title-wrapper">
    <!-- 左侧内容 -->
    <div class="left-content">
      <el-button @click="goBack" class="back-btn" type="text" style="border: none; color: #F7881A; margin-left: 120px;">
        <el-icon :size="24"><ArrowLeft /></el-icon>
      </el-button>
      <h2 style="margin-left: 50px;">{{ networksName }}</h2>
      <h4>|</h4>
      <h4>光网络编辑</h4>
    </div>

    <!-- 右侧按钮 -->
    <div class="right-buttons">
      <el-button class="add-btn1" style="">重命名网络</el-button>
      <el-button class="add-btn2" type="primary" style="margin-right: 380px;">
        <img src="/set-up.svg" alt="Add Transceiver" width="16" height="16" style="margin-right: 5px; background-color: transparent;">
        进行仿真
      </el-button>
    </div>
  </div>
</div>
  <div id="app" class="container">
    <div class="left-panel">
      <div class="bottom-box">
          <networkEditorPlugin />
      </div>
    </div>

    <div class="right-panel">
      <el-tabs v-model="activeTab">
        <el-tab-pane label="全局仿真" name="globalConfig">
          <GlobalConfig />
        </el-tab-pane>
        <el-tab-pane label="跨段参数" name="spanParams">
          <SpanParams />
        </el-tab-pane>
        <el-tab-pane label="SI" name="spectralInfo">
          <SpectralInfo />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>


<script setup lang="ts">
// 载入 Editor vue 组件，位于 @/components/vNetworkGraph.vue
import networkEditorPlugin from '@/components/networkEditorPlugin.vue';
import GlobalConfig from '@/components/GlobalConfig.vue';
import SpanParams from '@/components/SpanParams.vue';
import SpectralInfo from '@/components/SpectralInfo.vue';
import navigator from '@/components/navigator.vue';
import { getNetworkByIdAPI } from '@/api/networks';
import { ArrowLeft } from '@element-plus/icons-vue';



import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const activeTab = ref('globalConfig');
const networkId = route.params.networkId;
const networksName = ref('');

async function fetchNetworkData() {
  const response = await getNetworkByIdAPI(networkId);  // 调用接口获取光网络数据
  if (response) {
    networksName.value = response.network_name;
  } else {
    console.error("光网络数据格式不正确", response);
  }
}

function goBack() {
  router.go(-1);
}

fetchNetworkData();

</script>

<style scoped>
/* 页面整体布局 */
#app {
  width: 100%;
  background-color: white; /* 确保根容器背景为白色 */
}

.header {
  width: 100%;
  background-color:white;
}

.title-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.left-content {
  display: flex;
  align-items: center;
  gap: 8px;
}

.right-buttons {
  display: flex;
  align-items: center;
}

.container {
  display: flex;
  height: 80vh;
  background-color: white;
}

/* 左侧布局 */
.left-panel {
  flex: 1.5;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.top-box {
  flex: 1;
  max-height: 12%;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #f9f9f9;
  padding: 4px;
}

.bottom-box {
  flex: 2;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #f9f9f9;
  padding: 10px;
}

.add-btn1 {
  margin-left: 10px;
  border: 2px solid #F7881A; /* 设置边框宽度和颜色 */
  color: #F7881A; /* 设置文字颜色 */
  background-color: #F3F6E9; /* 设置背景颜色 */
  height: 38px;
}

.add-btn1:hover {
  background-color: #F7881A !important; /* 修改悬浮背景颜色 */
  border-color: #F7881A !important; /* 修改悬浮边框颜色 */
  color: white !important; /* 修改悬浮时的文字颜色 */
}

/* 修改按钮点击时的颜色 */
.add-btn1:active {
  background-color: #F7881A !important; /* 修改点击背景颜色 */
  border-color: #F7881A !important; /* 修改点击边框颜色 */
  color: white !important; /* 修改点击时的文字颜色 */
}

.add-btn2 {
  margin-left: 10px;
  border: none; /* 设置边框宽度和颜色 */
  color: #F3F6E9; /* 设置文字颜色 */
  background-color: #F7881A; /* 设置背景颜色 */
  height: 38px;
}

.add-btn2:hover {
  background-color: #ffa348 !important; /* 修改悬浮背景颜色 */
  color: white !important; /* 修改悬浮时的文字颜色 */
}

.add-btn1:active {
  background-color: #ffa348 !important; /* 修改悬浮背景颜色 */
  color: white !important; /* 修改悬浮时的文字颜色 */
}
/* 右侧布局 */
.right-panel {
  flex: 0.4;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0px 10px;
}

.result-box {
  flex: 1;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #f0f4f7;
  padding: 10px;
  max-height: 20%
}

.param-section {
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: white;
}

/* 行内布局 */
.inline-row {
  display: flex;
  align-items: center;
  gap: 20px; /* 控件之间的间距 */
}

:deep(.el-radio__input.is-checked .el-radio__inner) {
  border-color: #767676 !important; /* 选中时的边框颜色 */
  background-color: #767676 !important; /* 选中时的背景颜色 */
}

:deep(.el-radio-group .el-radio__input.is-checked + .el-radio__label) {
  color: #767676 !important; /* 选中时的文字颜色 */
}

.graph {
  width: 900px;
  height: 600px;
  border: none;
  }
  .event-logs {
  inset: auto 10px 10px auto;
  background: #fbedad44;
  border-radius: 4px;
  font-size: 11px;
  font-family: monospace;
  line-height: 11px;
  pointer-events: none;
}
.event-logs div {
  word-break: break-all;
}
.event-type {
  font-weight: bold;
}
/* 修改标签样式 */
:deep(.el-tabs__nav) {
  display: flex;
  justify-content: space-evenly; /* 使标签项均匀分布，避免遮挡 */
  width: 100%; /* 确保标签栏占据所有可用宽度 */
}

:deep(.el-tabs__item) {
  flex: 1;
  text-align: center; /* 文字居中 */
  min-width: 50px;
}

:deep(.el-tabs__item.is-active) {
  color: #F7881A; /* 选中标签文字颜色 */
}

:deep(.el-tabs__active-bar) {
  background-color: #F7881A; /* 选中标签下划线颜色 */
}

:deep(.el-tabs__item:hover) {
  color: #F7881A; /* 悬浮时文字颜色 */
}

</style>
