<template>
  <div class="spectral-info">
    <h3>频谱信息 Spectral Information</h3>
    <el-form>
      <el-form-item label="最低频率 (Hz)">
        <el-input v-model="minFrequency"></el-input>
      </el-form-item>
      <el-form-item label="最大频率 (Hz)">
        <el-input v-model="maxFrequency"></el-input>
      </el-form-item>
      <el-form-item label="波特率 (baud)">
        <el-input v-model="baudRate"></el-input>
      </el-form-item>
      <el-form-item label="载波间隔 (Hz)">
        <el-input v-model="carrierSpacing"></el-input>
      </el-form-item>
      <el-form-item label="发射信号弯曲系数">
        <el-input v-model="curvatureFactor"></el-input>
      </el-form-item>
      <el-form-item label="发射机输出 OSNR (dB)">
        <el-input v-model="osnr"></el-input>
      </el-form-item>
      <el-form-item label="目标输入功率 (dBm)">
        <el-input v-model="targetPower"></el-input>
      </el-form-item>
      <el-form-item label="功率扫描范围 (dB)">
        <el-input v-model="powerScanRange"></el-input>
      </el-form-item>
      <el-form-item label="系统余量 (dB)">
        <el-input v-model="systemMargin"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const minFrequency = ref("190.3e12");
const maxFrequency = ref("196.1e12");
const baudRate = ref("3.57e9");
const carrierSpacing = ref("50e9");
const curvatureFactor = ref(0.15);
const osnr = ref(35);
const targetPower = ref(2);
const powerScanRange = ref("0 1");
const systemMargin = ref(2);
</script>

<style scoped>
.spectral-info {
  padding: 10px;
  background-color: white;
}
</style>
