<template>
  <div class="global-config">
    <h3>全局参数 Global Config</h3>
    <el-form>
      <el-form-item>
        <el-checkbox v-model="enableRaman">启用 Raman 效应</el-checkbox>
      </el-form-item>
      <el-form-item label="Raman 效应计算模型">
        <el-select v-model="ramanModel">
          <el-option label="perturbative" value="perturbative"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="拟域展开阶数">
        <el-input v-model="expansionOrder" type="number"></el-input>
      </el-form-item>
      <el-form-item label="Raman 剖面空间分辨率 (m)">
        <el-input v-model="spatialResolution" type="number"></el-input>
      </el-form-item>
      <el-form-item label="求解密空间分辨率 (m)">
        <el-input v-model="solutionResolution" type="number"></el-input>
      </el-form-item>
      <el-form-item label="NLI 参数配置">
        <el-select v-model="nliConfig">
          <el-option label="ggn_spectrally_separated" value="ggn_spectrally_separated"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="色散容差参数">
        <el-input v-model="dispersionTolerance"></el-input>
      </el-form-item>
      <el-form-item label="相位偏移容差参数">
        <el-input v-model="phaseTolerance"></el-input>
      </el-form-item>
      <el-form-item label="显示计算 NLI 的通道编号">
        <el-input v-model="nliChannels"></el-input>
      </el-form-item>
      <el-form-item label="显示计算 NLI 的通道数量">
        <el-input v-model="nliChannelCount"></el-input>
      </el-form-item>
      <el-form-item label="放大器增益和输出功率的调整范围 (dB)">
        <el-input v-model="gainAdjustment"></el-input>
      </el-form-item>
      <el-form-item>
        <el-checkbox v-model="enableAutoDesign">启用 Auto-design</el-checkbox>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const enableRaman = ref(false);
const ramanModel = ref('perturbative');
const expansionOrder = ref(2);
const spatialResolution = ref(10000);
const solutionResolution = ref(100);
const nliConfig = ref('ggn_spectrally_separated');
const dispersionTolerance = ref(1);
const phaseTolerance = ref(0.1);
const nliChannels = ref("1,18,37,56,75");
const nliChannelCount = ref(6);
const gainAdjustment = ref(0.5);
const enableAutoDesign = ref(false);
</script>

<style scoped>
.global-config {
  padding: 10px;
  background-color: white;
}
</style>
