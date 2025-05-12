<template>
  <div class="span-params">
    <h3>光纤跨段参数 Span</h3>
    <el-form>
      <el-form-item>
        <el-checkbox v-model="enablePowerMode">启用 Power Mode</el-checkbox>
      </el-form-item>
      <el-form-item label="功率偏移范围 (dB)">
        <el-input v-model="powerOffsetRange"></el-input>
      </el-form-item>
      <el-form-item label="拉曼最大光纤线性损耗 (dB/km)">
        <el-input v-model="maxFiberLoss"></el-input>
      </el-form-item>
      <el-form-item label="光纤的最大长度 (km)">
        <el-input v-model="maxFiberLength"></el-input>
      </el-form-item>
      <el-form-item label="最小跨段损耗 (dB)">
        <el-input v-model="minSpanLoss"></el-input>
      </el-form-item>
      <el-form-item label="老化损耗 (dB)">
        <el-input v-model="agingLoss"></el-input>
      </el-form-item>
      <el-form-item label="入连接器损耗 (dB) 出连接器损耗 (dB)">
        <el-input v-model="connectorLoss"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const enablePowerMode = ref(false);
const powerOffsetRange = ref("0 3 3");
const maxFiberLoss = ref(0.2);
const maxFiberLength = ref(100);
const minSpanLoss = ref(0);
const agingLoss = ref(0);
const connectorLoss = ref("0 0");
</script>

<style scoped>
.span-params {
  padding: 10px;
  background-color: white;
}
</style>
