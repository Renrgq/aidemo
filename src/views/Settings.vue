<template>
  <div class="settings">
    <el-card shadow="hover">
      <template #header>
        <div class="card-header">
          <span>系统设置</span>
          <el-button
            type="primary"
            icon="Save"
            @click="handleSaveSettings"
          >
            保存设置
          </el-button>
        </div>
      </template>
      
      <el-form
        :model="form"
        label-width="150px"
      >
        <el-form-item
          v-for="setting in settings"
          :key="setting.id"
          :label="setting.description"
        >
          <el-input
            v-model="form[setting.id].value"
            placeholder="请输入"
          />
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { ElMessage } from 'element-plus'

  interface Setting {
    id: string
    key: string
    value: string
    description: string
  }

  const settings = ref<Setting[]>([
    { id: '1', key: 'site_name', value: '管理系统', description: '网站名称' },
    { id: '2', key: 'site_description', value: '一个简单的管理系统', description: '网站描述' },
    { id: '3', key: 'admin_email', value: 'admin@example.com', description: '管理员邮箱' },
    { id: '4', key: 'page_size', value: '10', description: '每页显示条数' }
  ])

  const form = ref(settings.value.reduce((acc, setting) => {
    acc[setting.id] = { ...setting }
    return acc
  }, {} as Record<string, Setting>))

  const handleSaveSettings = () => {
    // 这里可以添加保存设置的逻辑
    ElMessage.success('设置保存成功')
  }
</script>

<style scoped>
.settings {
  width: 100%;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>