<template>
  <div class="container">
    <navigator />
  </div>
  <div id="app">
    <div class="tabs-container">
      <!-- 切换按钮 -->
      <div class="tab"
           :class="{'active': activeList === 'network'}"
           @click="activeList = 'network'">
        我的光网络
      </div>
      <div class="tab"
           :class="{'active': activeList === 'device'}"
           @click="activeList = 'device'">
        器件库
      </div>
    </div>

    <!-- 我的光网络列表 -->
    <div v-if="activeList === 'network'" class="list-container">
      <div class="header">
        <h2>光网络列表</h2>
        <div class="button-container">
          <el-button @click="createNetwork" class="add-btn1">
            导入网络
          </el-button>
          <el-button @click="createNetwork" class="add-btn2">
            <img src="/document-add.svg" alt="Add Transceiver" width="16" height="16" style="margin-right: 5px; background-color: transparent;">
            添加新网络
          </el-button>
        </div>
      </div>
      <!-- 搜索框 -->
      <el-input
          v-model="networkSearch"
          placeholder="搜索光网络"
          suffix-icon="el-icon-search"
          style="width: 250px; margin-top: 10px;"
        />
      <el-table :data="filteredNetworks" style="margin-top: 20px;">
        <el-table-column prop="network_name" label="光网络名称"></el-table-column>
        <el-table-column label="操作">
          <template #default="{ row }">
            <el-button @click="goToDetail(row.network_id)" size="small" type="primary">查看详情</el-button>
            <el-button @click="editNetwork(row)" size="small" type="warning">修改</el-button>
            <el-button @click="deleteNetwork(row)" size="small" type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

     <!-- 器件库列表 -->
     <div v-if="activeList === 'device'" class="list-container">
      <div class="header">
        <h2>器件库列表</h2>
        <div class="button-container">
          <el-button @click="createDevice" class="add-btn1">
            导入器件库
          </el-button>
          <el-button @click="createDevice" class="add-btn2">
            <img src="/document-add.svg" alt="Add Transceiver" width="16" height="16" style="margin-right: 5px; background-color: transparent;">
            添加新器件库
          </el-button>
        </div>
      </div>
      <el-input
          v-model="deviceSearch"
          placeholder="搜索器件库"
          suffix-icon="el-icon-search"
          style="width: 250px; margin-top: 10px;"
        />
      <el-table :data="filteredDevices" style="margin-top: 20px;">
        <el-table-column prop="library_name" label="器件名称"></el-table-column>
        <el-table-column label="操作">
          <template #default="{ row }">
            <el-button @click="goToDeviceDetail(row.library_id, row.library_name)" size="small" type="primary">查看详情</el-button>
            <el-button @click="editDevice(row)" size="small" type="warning">修改</el-button>
            <el-button @click="deleteDevice(row)" size="small" type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>


<script>
import { ref, onMounted, watch } from 'vue';
import { ElButton, ElTable, ElTableColumn, ElMessageBox } from 'element-plus';
import { useRouter } from 'vue-router';
import navigator from '@/components/navigator.vue';
import { getNetworkListAPI, createNewNetworkAPI, updateNetworkAPI, deleteNetworkAPI } from "@/api/networks";  // 引入接口方法
import { getEquipmentLibAPI, createEquipmentLibAPI, updateEquipmentLibAPI, deleteEquipmentLibAPI } from "@/api/equipment";

export default {
  name: 'App',
  components: {
    ElButton,
    ElTable,
    ElTableColumn,
    ElMessageBox,
    navigator,
  },
  setup() {
    const router = useRouter(); // 获取路由实例
    const activeList = ref('network');
    const networks = ref([]);  // 初始化为空数组
    const devices = ref([]);
    const networkSearch = ref('');  // 光网络搜索框内容
    const deviceSearch = ref('');   // 器件搜索框内容
    const filteredNetworks = ref([]);  // 过滤后的光网络列表
    const filteredDevices = ref([]);   // 过滤后的器件列表

  const filterNetworks = () => {
  filteredNetworks.value = networks.value.filter(network =>
    network.network_name.toLowerCase().includes(networkSearch.value.toLowerCase())
  );
};
  // 搜索器件库
  const filterDevices = () => {
  filteredDevices.value = devices.value.filter(device =>
    device.library_name.toLowerCase().includes(deviceSearch.value.toLowerCase())
  );
};

    watch(networkSearch, (newSearch) => {
      filterNetworks(newSearch);
    });

    watch(deviceSearch, (newSearch) => {
      filterDevices(newSearch);
    });

  const goToDetail = (networkId) => {
  // 使用 URL 参数传递 networkId
  router.push(`/network/${networkId}`);
  console.log(networkId);
};

const goToDeviceDetail = (deviceId, libraryName) => {
  router.push({
    path: `/device/${deviceId}`,  // 路径参数
    query: { library_name: libraryName } // 查询参数
  });
};

    // 获取光网络列表
    const fetchNetworks = async () => {
  try {
    const response = await getNetworkListAPI();  // 调用接口获取光网络数据
    if (response && Array.isArray(response.networks)) {
      networks.value = response.networks;
      filteredNetworks.value = response.networks;  // 确保filteredNetworks初始化
    } else {
      console.error("光网络数据格式不正确", response);
    }
  } catch (error) {
    console.error('获取光网络数据失败', error);
  }
};


    // 新建光网络
    const createNetwork = async () => {
      ElMessageBox.prompt('请输入光网络名称', '新建光网络', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^(?!\s*$).+/,
        inputErrorMessage: '光网络名称不能为空'
      }).then(async ({ value }) => {
        try {
          const response = await createNewNetworkAPI(value);  // 调用创建光网络接口
          networks.value.push(response);  // 将新创建的光网络添加到列表中
          ElMessage.success('新建光网络成功');
          console.log(response);
        } catch (error) {
          ElMessage.error('新建光网络失败');
        }
      }).catch(() => {
        ElMessage.info('取消新建光网络');
      });
    };

    // 修改光网络名称
    const editNetwork = async (row) => {
      ElMessageBox.prompt('请输入新的光网络名称', '修改光网络', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputValue: row.network_name,
        inputPattern: /^(?!\s*$).+/,
        inputErrorMessage: '光网络名称不能为空'
      }).then(async ({ value }) => {
        try {
          const response = await updateNetworkAPI(row.network_id, value);  // 调用修改光网络名称接口
          const updatedNetwork = response;

          // 更新光网络名称
          row.network_name = updatedNetwork.network_name;
          ElMessage.success('光网络名称修改成功');
        } catch (error) {
          ElMessage.error('修改光网络名称失败');
        }
      }).catch(() => {
        ElMessage.info('取消修改光网络名称');
      });
    };

    // 删除光网络
    const deleteNetwork = async (row) => {
      ElMessageBox.confirm(`确定要删除光网络 "${row.network_name}" 吗?`, '删除光网络', {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        try {
          const response = await deleteNetworkAPI(row.network_id);  // 调用删除接口
          if (response.message === 'Network deleted successfully') {
            // 删除成功后，更新网络列表
            const index = networks.value.indexOf(row);
            if (index > -1) {
              networks.value.splice(index, 1);
            }
            ElMessage.success('光网络删除成功');
          }
        } catch (error) {
          ElMessage.error('删除光网络失败');
        }
      }).catch(() => {
        ElMessage.info('取消删除光网络');
      });
    };

     // 获取器件库列表
     const fetchDevices = async () => {
      try {
        const response = await getEquipmentLibAPI();  // 获取器件数据
        if (response && Array.isArray(response)) {
          devices.value = response;
          filteredDevices.value = response;
        } else {
          console.error("器件数据格式不正确", response);
        }
      } catch (error) {
        console.error('获取器件库数据失败', error);
      }
    };

    // 创建器件库
    const createDevice = async () => {
      ElMessageBox.prompt('请输入器件名称', '新建器件库', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^(?!\s*$).+/,
        inputErrorMessage: '器件名称不能为空'
      }).then(async ({ value }) => {
        try {
          const response = await createEquipmentLibAPI(value);
          devices.value.push(response);
          ElMessage.success('新建器件库成功');
        } catch (error) {
          ElMessage.error('新建器件库失败');
        }
      }).catch(() => {
        ElMessage.info('取消新建器件库');
      });
    };

    // 修改器件库
    const editDevice = async (row) => {
      ElMessageBox.prompt('请输入新的器件名称', '修改器件库', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputValue: row.name,
        inputPattern: /^(?!\s*$).+/,
        inputErrorMessage: '器件名称不能为空'
      }).then(async ({ value }) => {
        try {
          const response = await updateEquipmentLibAPI(row.library_id, value);
          row.library_name = response.library_name;
          ElMessage.success('器件名称修改成功');
        } catch (error) {
          ElMessage.error('修改器件名称失败');
        }
      }).catch(() => {
        ElMessage.info('取消修改器件名称');
      });
    };

    // 删除器件库
    const deleteDevice = async (row) => {
      ElMessageBox.confirm(`确定要删除器件 "${row.library_name}" 吗?`, '删除器件', {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        try {
          await deleteEquipmentLibAPI(row.library_id);
          const index = devices.value.indexOf(row);
          if (index > -1) {
            devices.value.splice(index, 1);
          }
          ElMessage.success('器件删除成功');
        } catch (error) {
          ElMessage.error('删除器件失败');
        }
      }).catch(() => {
        ElMessage.info('取消删除器件');
      });
    };

    // 在组件挂载时获取数据
    onMounted(() => {
      fetchNetworks(); // 获取光网络列表
      fetchDevices();

    });

    return {
      activeList,
      networks,
      devices,
      filteredNetworks,
      filteredDevices,
      networkSearch,  // 确保 networkSearch 被返回
      deviceSearch,
      filterNetworks,  // 确保 filterNetworks 被返回
      filterDevices,
      createNetwork,
      createDevice,
      deleteNetwork,
      deleteDevice,
      editNetwork,
      editDevice,
      goToDetail,
      goToDeviceDetail,
    };
  }
};
</script>

<style scoped>
#app {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .button-container {
    display: flex;
    justify-content: flex-end;  /* 把按钮靠右 */
    gap: 10px;  /* 按钮之间的间距 */
  }

.tabs-container {
  display: flex;
  border-bottom: 2px solid #F7881A;
  margin-bottom: 20px;
}

.tab {
  padding: 10px 20px;
  font-size: 18px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
  border-radius: 5px 5px 0 0;
}

.tab.active {
  background-color: #F7881A;
  color: white;
}

.tab:hover {
  background-color: rgba(247, 136, 26, 0.1);
}

.list-container {
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #e4e7ed;
  background-color: #f9fafb;
}

h2 {
  font-size: 24px;
  margin-bottom: 20px;
}

/* .add-btn1 {
  background-color: #fffffe;
  color: rgb(33, 33, 33);
  font-size: 16px;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.add-btn2 {
  background-color: #409EFF;
  font-weight: bold;
  font-size: 16px;
  border-radius: 4px;
  transition: background-color 0.3s ease;
} */

.add-btn1 {
  background-color: #F3F6E9; /* 背景颜色变浅 */
  color: #F7881A;
  font-size: 16px;
  height: 38px;
  border: 2px solid #F7881A;
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
  font-size: 16px;
}

.add-btn2:hover {
  background-color: #ffa348 !important; /* 修改悬浮背景颜色 */
  color: white !important; /* 修改悬浮时的文字颜色 */
}

.add-btn1:active {
  background-color: #ffa348 !important; /* 修改悬浮背景颜色 */
  color: white !important; /* 修改悬浮时的文字颜色 */
}

.el-table {
  width: 100%;
  margin-top: 20px;
}

.el-button {
  margin-left: 10px;
}
</style>
