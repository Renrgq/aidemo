<template>
  <div class="login-container">
    <el-card class="login-card" shadow="hover">
      <template #header>
        <div class="login-header">
          <h2>管理系统登录</h2>
        </div>
      </template>
      <el-form :model="form" label-width="80px" class="login-form">
        <el-form-item label="用户名">
          <el-input v-model="form.username" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" type="password" placeholder="请输入密码" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="login-button" :loading="loading" @click="handleLogin">
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

const router = useRouter()

const form = ref({
  username: '',
  password: ''
})

const loading = ref(false)

const handleLogin = () => {
  if (!form.value.username || !form.value.password) {
    ElMessage.error('请输入用户名和密码')
    return
  }
  
  loading.value = true
  
  // 模拟登录请求
  setTimeout(() => {
    loading.value = false
    // 存储登录状态
    localStorage.setItem('isLoggedIn', 'true')
    ElMessage.success('登录成功')
    router.push('/dashboard')
  }, 1000)
}
</script>

<style scoped>
.login-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f7fa;
}

.login-card {
  width: 400px;
  border-radius: 8px;
}

.login-header {
  text-align: center;
}

.login-form {
  margin-top: 20px;
}

.login-button {
  width: 100%;
}
</style>