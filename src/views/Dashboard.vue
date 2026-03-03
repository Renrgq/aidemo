<template>
  <div class="dashboard">
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card shadow="hover" class="stat-card">
          <template #header>
            <div class="card-header">
              <span>总用户数</span>
              <el-icon class="card-header-icon"><User /></el-icon>
            </div>
          </template>
          <div class="stat-value">1,234</div>
          <div class="stat-desc">较上月增长 12%</div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="hover" class="stat-card">
          <template #header>
            <div class="card-header">
              <span>总销售额</span>
              <el-icon class="card-header-icon"><Goods /></el-icon>
            </div>
          </template>
          <div class="stat-value">¥ 56,789</div>
          <div class="stat-desc">较上月增长 8%</div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="hover" class="stat-card">
          <template #header>
            <div class="card-header">
              <span>订单数</span>
              <el-icon class="card-header-icon"><ShoppingCart /></el-icon>
            </div>
          </template>
          <div class="stat-value">789</div>
          <div class="stat-desc">较上月增长 5%</div>
        </el-card>
      </el-col>
    </el-row>
    
    <el-row :gutter="20" style="margin-top: 20px">
      <el-col :span="12">
        <el-card shadow="hover">
          <template #header>
            <div class="card-header">
              <span>销售趋势</span>
            </div>
          </template>
          <div class="chart-container">
            <el-table :data="salesData" style="width: 100%">
              <el-table-column prop="name" label="月份" width="180" />
              <el-table-column prop="sales" label="销售额" />
            </el-table>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="hover">
          <template #header>
            <div class="card-header">
              <span>用户分布</span>
            </div>
          </template>
          <div class="chart-container">
            <el-table :data="userData" style="width: 100%">
              <el-table-column prop="name" label="用户类型" width="180" />
              <el-table-column prop="value" label="数量" />
            </el-table>
          </div>
        </el-card>
      </el-col>
    </el-row>
    
    <el-row :gutter="20" style="margin-top: 20px">
      <el-col :span="24">
        <el-card shadow="hover">
          <template #header>
            <div class="card-header">
              <span>产品销售排行</span>
            </div>
          </template>
          <div class="chart-container">
            <el-table :data="productData" style="width: 100%">
              <el-table-column prop="name" label="产品" width="180" />
              <el-table-column prop="sales" label="销售额" />
            </el-table>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { User, Goods, ShoppingCart } from '@element-plus/icons-vue'

const salesData = ref([
  { name: '1月', sales: 120 },
  { name: '2月', sales: 132 },
  { name: '3月', sales: 101 },
  { name: '4月', sales: 134 },
  { name: '5月', sales: 90 },
  { name: '6月', sales: 230 }
])

const userData = ref([
  { name: '新用户', value: 300 },
  { name: '活跃用户', value: 1200 },
  { name: '流失用户', value: 200 }
])

const productData = ref([
  { name: '产品A', sales: 400 },
  { name: '产品B', sales: 300 },
  { name: '产品C', sales: 300 },
  { name: '产品D', sales: 200 }
])

const colors = ['#409EFF', '#67C23A', '#E6A23C']
</script>

<style scoped>
.dashboard {
  width: 100%;
}

.stat-card {
  height: 150px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-header-icon {
  font-size: 16px;
  color: #409EFF;
}

.stat-value {
  font-size: 32px;
  font-weight: bold;
  margin-top: 20px;
  color: #303133;
}

.stat-desc {
  font-size: 14px;
  color: #909399;
  margin-top: 10px;
}

.chart-container {
  width: 100%;
  height: 300px;
}
</style>