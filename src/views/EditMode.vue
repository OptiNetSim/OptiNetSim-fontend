<template>
  <div class="edit-mode-page">
    <el-form :model="formData" ref="formRef" label-width="160px">
      <!-- 基础参数 -->
      <el-form-item label="Format">
        <el-input v-model="formData.format" />
      </el-form-item>

      <el-form-item label="Baud Rate (Gbaud)">
        <el-input-number
          v-model="formData.baud_rate"
          :precision="2"
          :step="0.01"
          :min="0"
          controls-position="right"
        />
      </el-form-item>

      <el-form-item label="OSNR">
        <el-input-number
          v-model="formData.OSNR"
          :precision="2"
          :step="0.1"
          :min="0"
          controls-position="right"
        />
      </el-form-item>

      <el-form-item label="Bit Rate (Gbit/s)">
        <el-input-number
          v-model="formData.bit_rate"
          :precision="2"
          :step="0.1"
          :min="0"
          controls-position="right"
        />
      </el-form-item>

      <el-form-item label="Roll Off">
        <el-input-number
          v-model="formData.roll_off"
          :precision="2"
          :step="0.01"
          :min="0"
          controls-position="right"
        />
      </el-form-item>

      <el-form-item label="TX OSNR">
        <el-input-number
          v-model="formData.tx_osnr"
          :precision="2"
          :step="0.1"
          :min="0"
          controls-position="right"
        />
      </el-form-item>

      <el-form-item label="Min Spacing (GHz)">
        <el-input-number
          v-model="formData.min_spacing"
          :precision="2"
          :step="0.1"
          :min="0"
          controls-position="right"
        />
      </el-form-item>

      <el-form-item label="Cost">
        <el-input-number
          v-model="formData.cost"
          :precision="2"
          :step="0.1"
          :min="0"
          controls-position="right"
        />
      </el-form-item>

      <!-- Penalties 表格 -->
      <el-form-item label="Penalties 配置">
        <el-table :data="processedPenalties" border>
          <el-table-column label="参数类型" width="180">
            <template #default="{ row }">
              <el-select v-model="row.type" placeholder="选择类型">
                <el-option
                  v-for="type in penaltyTypes"
                  :key="type.value"
                  :label="type.label"
                  :value="type.value"
                />
              </el-select>
            </template>
          </el-table-column>

          <el-table-column label="参数值" width="180">
            <template #default="{ row }">
              <el-input-number
                v-model="row.value"
                :precision="4"
                controls-position="right"
              />
            </template>
          </el-table-column>

          <el-table-column label="惩罚值" width="180">
            <template #default="{ row }">
              <el-input-number
                v-model="row.penalty_value"
                :precision="2"
                :step="0.1"
                controls-position="right"
              />
            </template>
          </el-table-column>

          <el-table-column label="操作" width="120">
            <template #default="{ $index }">
              <el-button
                type="danger"
                @click="deletePenalty($index)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>

        <el-button
          type="primary"
          @click="addPenalty"
          style="margin-top: 12px"
        >+ 新增惩罚项</el-button>
      </el-form-item>
    </el-form>

    <div class="action-buttons">
      <el-button @click="handleCancel">返回</el-button>
      <el-button type="primary" @click="handleSave">保存修改</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      originalData: null, // 原始数据副本
      formData:{
        format: '',
        baud_rate: 0,
        OSNR: 0,
        bit_rate: 0,
        roll_off: 0,
        tx_osnr: 0,
        min_spacing: 0,
        cost: 0,
        penalties: []
      }, // 表单数据
      penaltyTypes: [
        { label: "色散补偿", value: "chromatic_dispersion" },
        { label: "偏振模色散", value: "pmd" },
        { label: "偏振相关损耗", value: "pdl" },
      ],
    };
  },
  computed: {
    // 将原始 penalties 转换为表格可编辑格式
    processedPenalties() {
      return this.formData.penalties.map((p) => {
        const type = Object.keys(p).find((k) => k !== "penalty_value");
        return {
          type: type,
          value: p[type],
          penalty_value: p.penalty_value,
        };
      });
    },
  },
  created() {
    // 从路由参数中获取数据
    const { modeData } = this.$route.query;
  if (modeData) {
    try {
      this.formData = JSON.parse(modeData); // 解析为对象
    } catch (error) {
      console.error('Failed to parse modeData:', error);
    }
  }
  },
  methods: {
    // 添加新惩罚项
    addPenalty() {
      this.formData.penalties.push({
        type: "chromatic_dispersion",
        value: 0,
        penalty_value: 0,
      });
    },

    // 删除惩罚项
    deletePenalty(index) {
      this.formData.penalties.splice(index, 1);
    },

    // 转换回原始数据格式
    transformPenalties() {
      return this.processedPenalties.map((p) => ({
        [p.type]: p.value,
        penalty_value: p.penalty_value,
      }));
    },

    // 保存处理
    handleSave() {
      const payload = {
        ...this.formData,
        penalties: this.transformPenalties()
      };
      this.$emit('save', payload);
      this.$router.back(); // 返回父组件，不触发父组件重新加载
    },

    // 取消修改
    handleCancel() {
      this.$confirm("确定放弃修改吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      }).then(() => {
        this.$router.push({
    path: '/parent/' + this.$route.params.deviceId, // 确保路径匹配父组件
    query: {
      keepDialogOpen: true, // 保持弹窗打开
      library_name: this.$route.query.library_name // 保留必要参数
    }
  });
      });
    },
  },
};
</script>

<style scoped>
.edit-mode-page {
  padding: 24px;
  max-width: 1200px;
  margin: 0 auto;
}

.action-buttons {
  margin-top: 32px;
  text-align: center;
}
</style>
