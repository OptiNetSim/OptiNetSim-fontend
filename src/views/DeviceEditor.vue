<template>
  <div class="m-container">
    <navigator />
  </div>
 <div class="container">
    <div class="header">
      <!-- 新增返回按钮 -->
      <div class="title-wrapper">
        <el-button @click="goBack" class="back-btn" type="text">
          <el-icon :size="24"><ArrowLeft /></el-icon>
        </el-button>
        <h2>{{ libraryName }}</h2>
      </div>
      <!-- 原有按钮容器 -->
      <div class="button-container">
        <el-button class="add-btn1">导入器件</el-button>
        <el-button class="add-btn2" type="primary">添加新器件</el-button>
      </div>
    </div>
  </div>
  <div class="page-container">
    <!-- 标签页组件 -->
    <el-tabs v-model="activeTab" type="card" class="tabs-container">
      <!-- 光放大器 Edfa 标签页 -->
      <el-tab-pane label="光放大器 Edfa" name="Edfa">
      <el-table :data="edfaDevices" class="table-container">
        <el-table-column
          v-for="col in tableColumns.Edfa"
          :key="col.prop"
          :prop="col.prop"
          :label="col.label"
          :formatter="col.formatter"
        />
        <el-table-column label="操作">
          <template #default="{ row }">
            <el-button @click="showDeviceDetail(row)" type="primary">查看详情</el-button>
            <el-button @click="deleteDevice(row)" size="small" type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-tab-pane>

      <!-- 光纤 Fiber 标签页 -->
      <el-tab-pane label="光纤 Fiber" name="Fiber">
        <el-table :data="fiberDevices" class="table-container">
          <el-table-column
          v-for="col in tableColumns.Fiber"
          :key="col.prop"
          :prop="col.prop"
          :label="col.label"
          :formatter="col.formatter"
        />
        <el-table-column label="操作">
          <template #default="{ row }">
            <el-button @click="showDeviceDetail(row)" type="primary">查看详情</el-button>
            <el-button @click="deleteDevice(row)" size="small" type="danger">删除</el-button>
          </template>
        </el-table-column>
        </el-table>
      </el-tab-pane>

      <!-- 拉曼光纤 RamanFiber 标签页 -->
      <el-tab-pane label="拉曼光纤 RamanFiber" name="RamanFiber">
        <el-table :data="ramanFiberDevices" class="table-container">
          <el-table-column
          v-for="col in tableColumns.RamanFiber"
          :key="col.prop"
          :prop="col.prop"
          :label="col.label"
          :formatter="col.formatter"
        />
        <el-table-column label="操作">
          <template #default="{ row }">
            <el-button @click="showDeviceDetail(row)" type="primary">查看详情</el-button>
            <el-button @click="deleteDevice(row)" size="small" type="danger">删除</el-button>
          </template>
        </el-table-column>
        </el-table>
      </el-tab-pane>

      <!-- 可重构光分插复用器 Roadm 标签页 -->
      <el-tab-pane label="可重构光分插复用器 Roadm" name="Roadm">
        <el-table :data="roamDevices" class="table-container">
          <el-table-column
          v-for="col in tableColumns.Roadm"
          :key="col.prop"
          :prop="col.prop"
          :label="col.label"
          :formatter="col.formatter"
        />
        <el-table-column label="操作">
          <template #default="{ row }">
            <el-button @click="showDeviceDetail(row)" type="primary">查看详情</el-button>
            <el-button @click="deleteDevice(row)" size="small" type="danger">删除</el-button>
          </template>
        </el-table-column>
        </el-table>
      </el-tab-pane>

      <!-- 收发器 Transceiver 标签页 -->
      <el-tab-pane label="收发器 Transceiver" name="Transceiver">
        <el-table :data="transceiverDevices" class="table-container">
          <el-table-column
          v-for="col in tableColumns.Transceiver"
          :key="col.prop"
          :prop="col.prop"
          :label="col.label"
          :formatter="col.formatter"
        />
        <el-table-column label="操作">
          <template #default="{ row }">
            <el-button @click="showDeviceDetail(row)" type="primary">查看详情</el-button>
            <el-button @click="deleteDevice(row)" size="small" type="danger">删除</el-button>
          </template>
        </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
  <!-- 弹窗 -->
  <el-dialog
  v-model="dialogVisible"
  :key="activeTab"
  title="器件详情"
  width="60%"
  @close="handleClose">
  <el-form :model="deviceDetail" ref="deviceForm" label-width="180px" class="compact-form">
    <template v-for="(value, key) in deviceDetail" :key="key">

      <el-form-item v-if="key === 'restrictions'" :label="translateLabel(key)" prop="restrictions">
  <!-- Preamp 下拉框 -->
  <el-form-item label="Preamp 增益器列表">
    <el-select
      v-model="deviceDetail.restrictions.preamp_variety_list"
      multiple
      filterable
      placeholder="请选择 Preamp 增益器"
      style="width: 100%"
    >
      <!-- 动态生成选项 -->
      <el-option
        v-for="item in getPreampOptions"
        :key="item"
        :label="item"
        :value="item"
      />
    </el-select>
  </el-form-item>

  <!-- Booster 下拉框 -->
  <el-form-item label="Booster 增益器列表">
    <el-select
      v-model="deviceDetail.restrictions.booster_variety_list"
      multiple
      filterable
      placeholder="请选择 Booster 增益器"
      style="width: 100%"
    >
      <!-- 动态生成选项 -->
      <el-option
        v-for="item in getBoosterOptions"
        :key="item"
        :label="item"
        :value="item"
      />
    </el-select>
  </el-form-item>
</el-form-item>
      <!-- 处理 type_def 数组 -->
      <el-form-item
  v-if="key === 'type_def'"
  :label="translateLabel(key)"
  prop="type_def"
  >
  <el-select v-model="deviceDetail[key]" placeholder="请选择">
    <el-option
      v-for="option in typeDefOptions"
      :key="option.value"
      :label="option.label"
      :value="option.value"
    />
  </el-select>
      </el-form-item>

      <!-- 处理 nf_coef 数组 -->
    <el-form-item v-if="key === 'nf_coef'" :label="translateLabel(key)">
      <div v-for="(coef, index) in value" :key="index">
        <el-input v-model="deviceDetail[key][index]" :step="0.0001" :precision="4" :min="-Infinity" :max="Infinity" placeholder="Enter value" />
      </div>
    </el-form-item>

     <!-- 显示和编辑频率 -->
     <el-form-item v-if="key === 'frequency'" :label="translateLabel(key)">
  <div>
    <!-- 添加标签，显示最小频率 -->
    <label for="min-frequency">最小频率：</label>
    <el-input
      id="min-frequency"
      v-model="deviceDetail.frequency.min"
      :min="0"
      label="最小频率" /> Hz
    <br />

    <!-- 添加标签，显示最大频率 -->
    <label for="max-frequency">最大频率：</label>
    <el-input
      id="max-frequency"
      v-model="deviceDetail.frequency.max"
      :min="0"
      label="最大频率" /> Hz
  </div>
</el-form-item>

      <!-- 处理其他普通字段 -->
      <el-form-item
      v-else-if="key !== 'mode' && key !== 'nf_coef' && key !== 'frequency' && key !== 'type_def' && key !== 'restrictions'"
      :label="translateLabel(key)"
      >
        <el-input v-if="typeof value === 'string'" v-model="deviceDetail[key]" type="text" :disabled="key === 'type_variety'" />
        <el-input v-else-if="typeof value === 'number'" v-model="deviceDetail[key]" :precision="getPrecision(value)" :step="getStep(value)" controls-position="right" :disabled="key === 'type_variety'" />
        <el-checkbox v-else-if="typeof value === 'boolean'" v-model="deviceDetail[key]" :disabled="key === 'type_variety'" />
      </el-form-item>

      <!-- 处理 mode 的表格 -->
      <el-form-item v-if="key === 'mode'" :label="translateLabel(key)">
          <el-table :data="deviceDetail[key]" class="table-container">
            <el-table-column label="波特率" prop="baud_rate">
              <template #default="{ row }">
                <span>{{ (row.baud_rate / 1e9).toFixed(2) }} Gbaud</span>
              </template>
            </el-table-column>

            <el-table-column label="比特率" prop="bit_rate">
              <template #default="{ row }">
                <span>{{ (row.bit_rate / 1e9).toFixed(2) }} Gbit/s</span>
              </template>
            </el-table-column>

            <el-table-column label="OSNR" prop="OSNR">
              <template #default="{ row }">
                <span>{{ row.OSNR }}</span>
              </template>
            </el-table-column>

            <el-table-column label="操作">
              <template #default="{ row, $index }">
              <el-button
               @click="editMode(row, $index)"
               size="small"
              >修改</el-button>
                <el-button @click="deleteMode(row)" size="small" type="danger">删除</el-button>
              </template>
            </el-table-column>
          </el-table>

          <!-- 添加新模式按钮 -->
          <el-button @click="addNewMode" type="primary" class="add-mode-btn">添加新模式</el-button>
        </el-form-item>
    </template>
  </el-form>

  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取消</el-button>
    <el-button @click="saveDeviceDetails" type="primary">保存</el-button>
  </span>
</el-dialog>
<router-view @save="handleModeSave" />
</template>

<script>
import { ArrowLeft } from '@element-plus/icons-vue';
import { useRoute } from 'vue-router';
import { getEquipmentListAPI } from '@/api/equipment';
import httpInstance from "@/utils/request";

export default {
  components: {
    ArrowLeft
  },
  data() {
    const route = useRoute();
    return {
      deviceId: route.params.deviceId,
      libraryName: route.query.library_name,
      formFields: [],
      activeTab: "Edfa", // 默认选中的标签
      // 初始化空设备列表
      labelTranslations: {
      type_variety: '名称',
      type_def: '模型',
      gain_flatmax: '最大平坦增益（dB）',
      gain_min: '最小增益（dB）',
      p_max: '最大功率（W）',
      allowed_for_design: '允许自助设计',
      nf_coef: '噪声系数-多项式系数',
      pmd: '偏振模色散（ps）',
      pdl: '偏振相关损耗（dB）',
      dispersion: '色散系数（ps/nm/km）',
      effective_area: '有效面积(m²)',
      pmd_coef: '偏振模色散系数(s)',
      target_pch_out_db: '目标输出功率（dBm）',
      add_drop_osnr: '上下路OSNR（dB）',
      frequency: '频率范围',
      mode: '模式',
      baud_rate: '波特率',
      bit_rate: '比特率',
      OSNR: 'OSNR',
      restrictions: '限制条件',
      preamp_variety_list: '前置放大器列表',
      booster_variety_list: '后置放大器列表'
    },
      edfaDevices: [],
      fiberDevices: [],
      ramanFiberDevices: [],
      roamDevices: [],
      transceiverDevices: [],
      loading: true,  // 加载状态
      error: null,     // 错误信息
      dialogVisible: false,
      deviceDetail: {},
      defaultPreampOptions: ["std_booster", "std_booster_L"],
      defaultBoosterOptions: ["std_booster", "std_booster_L"],
      typeDefOptions: [
      { value: 'advanced_model', label: 'advanced_model' },
      { value: 'variable_gain', label: 'variable_gain' },
      { value: 'fixed_gain', label: 'fixed_gain' },
      { value: 'dual_stage', label: 'dual_stage' },
      { value: 'multi_band', label: 'multi_band' },
      { value: 'openroadm', label: 'openroadm' }
    ],
      tableColumns: {
        Edfa: [
          { prop: "type_variety", label: "类型" },
          { prop: "type_def", label: "定义" },
          { prop: "gain_flatmax", label: "最大增益" }
        ],
        Fiber: [
          { prop: "type_variety", label: "类型" },
          { prop: "dispersion", label: "色散" },
          { prop: "effective_area", label: "有效面积" }
        ],
        RamanFiber: [
          { prop: "type_variety", label: "类型" },
          { prop: "dispersion", label: "色散" },
          { prop: "effective_area", label: "有效面积" }
        ],
        Roadm: [
          { prop: "type_variety", label: "类型" },
          { prop: "target_pch_out_db", label: "目标输出功率" },
          { prop: "pmd", label: "PMD" }
        ],
        Transceiver: [
          { prop: "type_variety", label: "类型" },
          { prop: "frequency", label: "频率范围", formatter: this.formatFrequency0 }
        ]
    }
  }
  },
  methods: {
    handleClose() {
    this.$refs.deviceForm.resetFields();
    this.deviceDetail = {};  // 清空设备详情
  },
    goBack(){
      this.$router.go(-1);
    },
    // 点击查看详情按钮时调用的函数
    async fetchAllDevices() {
      try {
        const response = await  getEquipmentListAPI (this.deviceId);
        this.edfaDevices = response.Edfa || []
        this.fiberDevices = response.Fiber || []
        this.ramanFiberDevices = response.RamanFiber || []
        this.roamDevices = response.Roadm || []
        this.transceiverDevices = response.Transceiver || []
      } catch (error) {
        console.error('设备加载失败:', error)
        this.$message.error('设备数据加载失败')
      }
    },
    async deleteDevice(device) {
  try {
    // 弹出确认框，确认删除操作
    const confirmDelete = await this.$confirm('确定要删除该设备吗?', '警告', {
      confirmButtonText: '删除',
      cancelButtonText: '取消',
      type: 'warning'
    });

    // 如果用户确认删除
    if (confirmDelete) {
      // 获取需要的路径参数
      const libraryId = this.deviceId;  // 这里假设库名是用作库ID
      const category = this.activeTab;  // 动态设置 category，基于当前选中的标签页
      const cate = this.activeTab.charAt(0).toLowerCase() + this.activeTab.slice(1);
      console.log('cate:', cate);
      const typeVariety = device.type_variety;  // 假设每个设备有 type_variety 字段

      // 构建请求URL
      const url = `/api/equipment-libraries/${libraryId}/equipment/${category}/${typeVariety}`;

      // 发送 DELETE 请求
      const response = await httpInstance.delete(url);

      // 检查返回结果
      if (response.message === "Equipment deleted successfully") {
        this.$message.success('设备删除成功');
        // 可以在这里更新 UI 或删除本地设备列表中的该设备
        const index = this[`${cate}Devices`].indexOf(device);  // 根据 category 动态更新设备列表
        if (index !== -1) {
          this[`${cate}Devices`].splice(index, 1);  // 删除设备
        }
      }
    }
  } catch (error) {
    console.error('删除设备失败', error);
    this.$message.error('删除设备失败');
  }
},

showDeviceDetail(device) {
    const cleanData = JSON.parse(JSON.stringify(device));

    // 只有 Roadm 设备才初始化 restrictions 字段
    if (this.activeTab === 'Roadm' && !cleanData.restrictions) {
      cleanData.restrictions = {
        preamp_variety_list: [],
        booster_variety_list: [],
      };
    }

    this.deviceDetail = cleanData;
    this.dialogVisible = true;
  },
    formatFrequency0(row) {
      return `${(row.frequency.min / 1e12).toFixed(2)} THz - ${(row.frequency.max / 1e12).toFixed(2)} THz`
    },

    formatFrequency(value) {
      if (value >= 1e12) {
        return `${(value / 1e12).toFixed(2)} THz`;
      } else if (value >= 1e9) {
        return `${(value / 1e9).toFixed(2)} GHz`;
      } else {
        return `${value} Hz`;
      }
    },
    editMode(row, index) {
      this.$router.push({
    name: 'EditMode',
    params: {
      deviceId: this.$route.params.deviceId // 保留设备ID
    },
    query: {
      ...this.$route.query, // 保留现有查询参数
      modeData: JSON.stringify(row),
      modeIndex: index,
      keepDialogOpen: true // 新增标记
    }
  });
    },
    handleModeSave(updatedMode) {
    const index = this.deviceDetail.mode.findIndex(
      m => m.format === updatedMode.format
    );
    if (index !== -1) {
      // 直接更新本地数据（无需重新请求接口）
      this.deviceDetail.mode.splice(index, 1, updatedMode);
    }
  },
    deleteMode(row) {
      console.log('删除模式', row);
    },

    // 判断是否为对象
  isObject(value) {
    return value && typeof value === 'object' && !Array.isArray(value)
  },

  // 格式化字段标签（将下划线转换为空格并首字母大写）
  translateLabel(key) {
    return this.labelTranslations[key] || this.formatLabel(key)
  },
  // 保留原来的格式化方法
  formatLabel(key) {
    return key.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase())
  },

  // 根据数值大小动态设置精度
  getPrecision(value) {
    if (Math.abs(value) < 1) return 6
    if (Math.abs(value) < 10) return 2
    return 0
  },

  // 根据数值大小动态设置步长
  getStep(value) {
    if (Math.abs(value) < 1) return 0.01
    if (Math.abs(value) < 10) return 0.1
    return 1
  },
  getPenaltyFields(penalties) {
    const fields = new Set();
    penalties.forEach(item => {
      Object.keys(item).forEach(key => fields.add(key));
    });
    return Array.from(fields); // 返回唯一字段数组
  },

  // 保存逻辑
  async saveDeviceDetails() {
  try {
    const libraryId = this.deviceId;  // 假设库名是用作库ID
    const category = this.activeTab;  // 动态设置 category，基于当前选中的标签
    const typeVariety = this.deviceDetail.type_variety; // 设备的类型品种
    const cate = category.charAt(0).toLowerCase() + category.slice(1); // 首字母小写的 category

    // 打印请求数据
    console.log('Request Data:', this.deviceDetail);
    // 构建请求URL
    const url = `/api/equipment-libraries/${libraryId}/equipment/${category}/${typeVariety}`;

    // 初始化请求数据对象
    let requestData = {};

    // 根据设备类型构建不同的请求体
    if (category === "Edfa") {
      const nfCoefArray = this.deviceDetail.nf_coef.map(coef => parseFloat(coef));
      requestData = {
        type_variety: this.deviceDetail.type_variety,
        type_def: this.deviceDetail.type_def,
        gain_flatmax: parseFloat(this.deviceDetail.gain_flatmax),
        gain_min: parseFloat(this.deviceDetail.gain_min),
        p_max: parseFloat(this.deviceDetail.p_max),
        nf_coef: nfCoefArray,
        pmd: parseFloat(this.deviceDetail.pmd),
        pdl: parseFloat(this.deviceDetail.pdl),
        allowed_for_design: this.deviceDetail.allowed_for_design,

      };
    } else if (category === "Fiber" || category === "RamanFiber") {
      requestData = {
        type_variety: this.deviceDetail.type_variety,
        dispersion: parseFloat(this.deviceDetail.dispersion),
        effective_area: parseFloat(this.deviceDetail.effective_area),
        pmd_coef: parseFloat(this.deviceDetail.pmd_coef),
      };
    } else if (category === "Roadm") {
      requestData = {
        type_variety: this.deviceDetail.type_variety,
        target_pch_out_db: parseFloat(this.deviceDetail.target_pch_out_db),
        add_drop_osnr: parseFloat(this.deviceDetail.add_drop_osnr),
        pmd: parseFloat(this.deviceDetail.pmd),
        pdl: parseFloat(this.deviceDetail.pdl),
        restrictions: {
            preamp_variety_list: this.deviceDetail.restrictions.preamp_variety_list,
            booster_variety_list: this.deviceDetail.restrictions.booster_variety_list,
          },
      };
    } else if (category === "Transceiver") {
      requestData = {
        type_variety: this.deviceDetail.type_variety,
        frequency: this.deviceDetail.frequency,
        mode: this.deviceDetail.mode.map((mode) => {
          return {
            format: mode.format,
            baud_rate: mode.baud_rate,
            OSNR: mode.OSNR,
            bit_rate: mode.bit_rate,
            roll_off: mode.roll_off,
            tx_osnr: mode.tx_osnr,
            penalties: mode.penalties,
            min_spacing: mode.min_spacing,
            cost: mode.cost
          };
        })
      };
    }

    // 发送 PUT 请求
    const response = await httpInstance.put(url, requestData);

    // 检查响应状态和数据
    if (response.type_variety == this.deviceDetail.type_variety) {
      this.$message.success('设备保存成功');
      await this.fetchAllDevices();
      this.dialogVisible = false; // 关闭弹窗
    } else {
      this.$message.error('保存失败，请重试');
    }
  }catch (error) {
  console.error('保存设备失败', error);
  let errorMessage = '保存设备失败';
  if (error.response) {
    // 显示后端返回的具体错误信息
    errorMessage = error.response.message || error.response.error;
    console.error('服务器返回的错误信息:', error.response);
  } else if (error.request) {
    errorMessage = '请求未收到响应';
  } else {
    errorMessage = '请求配置错误';
  }
  this.$message.error(errorMessage);
}
},

},
activated() {
  if (this.$route.query.keepDialogOpen) {
      this.dialogVisible = true;
      // 重新加载设备详情数据（关键！）
    }
  },
 mounted() {
    this.fetchAllDevices()
  },
  computed: {
  // 生成 Preamp 下拉框的选项列表
  getPreampOptions() {
    const selectedOptions = this.deviceDetail.restrictions.preamp_variety_list || [];
    return [...new Set([...this.defaultPreampOptions, ...selectedOptions])];
  },
  // 生成 Booster 下拉框的选项列表
  getBoosterOptions() {
    const selectedOptions = this.deviceDetail.restrictions.booster_variety_list || [];
    return [...new Set([...this.defaultBoosterOptions, ...selectedOptions])];
  },
},
}
</script>

<style scoped>

.container {
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #e4e7ed;
  background-color: #f9fafb;
}


/* 新增样式 */
.title-wrapper {
  display: flex;
  align-items: center;
  gap: 8px; /* 按钮与标题间距 */
}

.add-btn2{
  background-color: #F7881A;
  color: #F3F6E9;
  border: none;
}

.add-btn2:hover {
  background-color: #e8811a;
  color: #F3F6E9;
}

.back-btn {
  padding: 0;
  margin-right: 8px; /* 按钮右边距 */
  color: #F7881A;
  width: 40px;
  height: 80px;
}

.back-btn:hover .el-icon {
  color: #e8811a; /* 修改图标颜色 */
}

/* 调整原有header样式 */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* 新增高度限制 */
  min-height: 40px;
}

  .button-container {
    display: flex;
    justify-content: flex-end;  /* 把按钮靠右 */
    gap: 10px;  /* 按钮之间的间距 */
  }


  .page-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px 5%;
  /* 新增以下属性 */
  box-sizing: border-box; /* 包含padding在宽度计算中 */
}

/* 新增样式 */
.tabs-container {
  width: 100%;
  margin: 20px 0;
}

/* 标签头样式 */
:deep(.el-tabs__header) {
  margin: 0 !important;  /* 移除自动居中 */
  display: block;  /* 改为块级元素 */
  background: #f5f7fa;
}

/* 导航栏包裹容器 */
:deep(.el-tabs__nav-wrap) {
  display: flex !important;  /* 启用flex布局 */
  justify-content: flex-start;  /* 左对齐 */
  overflow: hidden;  /* 隐藏滚动条 */
}

/* 导航栏 */
:deep(.el-tabs__nav) {
  display: flex !important;
  flex: 1;  /* 占据全部可用空间 */
  border: 1px solid #e4e7ed;
  border-radius: 4px;
}

:deep(.el-table__header) colgroup col {
  width: auto !important;  /* 覆盖element默认列宽 */
}

/* 单个标签项 */
:deep(.el-tabs__item) {
  flex: 1;  /* 等分宽度 */
  text-align: center;
  padding: 0 15px;  /* 调整左右间距 */
  border-left: 1px solid transparent;
  min-width: 205px;  /* 设置最小宽度 */
}

:deep(.el-tabs__item:hover){
  color: #F7881A;
}

/* 激活态标签 */
:deep(.el-tabs__item.is-active) {
  background: #ffffff;
  border-color: #e4e7ed;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  color:#F7881A;
}


/* 标签间隔线 */
:deep(.el-tabs__item + .el-tabs__item) {
  border-left: 1px solid #e4e7ed;
}

.el-tab-pane {
  width: 100%;
  justify-content: center;
  overflow-x: auto;
}

.table-container {
  width: 100% !important;  /* 强制表格宽度100% */
  margin: 0;
}

/* 调整按钮容器间距 */
.button-container .el-button {
  margin-top: 0;
}

.el-table-column {
  text-align: center;
  white-space: nowrap;
}

.dialog-footer {
  text-align: right;
}

.el-input {
  width: 40%; /* 默认宽度 */
}
</style>
