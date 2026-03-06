<template>
  <div class="app-container">
    <el-container class="container">
      <el-aside
        :width="collapsed ? '64px' : '200px'"
        class="aside"
      >
        <div class="logo">
          <el-image
            src="/vite.svg"
            fit="cover"
            class="logo-img"
          />
          <span
            v-if="!collapsed"
            class="logo-text"
          >管理系统</span>
        </div>
        <el-menu
          :default-active="$route.path"
          class="menu"
          router
          :collapse="collapsed"
          background-color="#001529"
          text-color="#fff"
          active-text-color="#409EFF"
        >
          <el-menu-item index="/dashboard">
            <el-icon><Search /></el-icon>
            <span v-if="!collapsed">仪表盘</span>
          </el-menu-item>
          <el-menu-item index="/users">
            <el-icon><Search /></el-icon>
            <span v-if="!collapsed">用户管理</span>
          </el-menu-item>
          <el-menu-item index="/products">
            <el-icon><Search /></el-icon>
            <span v-if="!collapsed">产品管理</span>
          </el-menu-item>
          <el-menu-item index="/settings">
            <el-icon><Search /></el-icon>
            <span v-if="!collapsed">设置</span>
          </el-menu-item>
        </el-menu>
        <el-button
          class="collapse-btn"
          link
          @click="collapsed = !collapsed"
        >
          <el-icon>
            <Menu />
          </el-icon>
        </el-button>
      </el-aside>
      <el-container class="main-container">
        <el-header class="header">
          <div class="header-title">
            {{ $route.name }}
          </div>
          <div class="header-user">
            <el-dropdown>
              <span class="user-info">
                <el-avatar
                  size="small"
                  :src="'/vite.svg'"
                />
                <span v-if="!collapsed">管理员</span>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>个人中心</el-dropdown-item>
                  <el-dropdown-item @click="handleLogout">
                    退出登录
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </el-header>
        <el-main class="main">
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { ElMessage } from 'element-plus'

  const collapsed = ref(false)
  const router = useRouter()

  const handleLogout = () => {
    // 清除登录状态
    localStorage.removeItem('isLoggedIn')
    ElMessage.success('退出登录成功')
    router.push('/login')
  }
</script>

<style scoped>
.app-container {
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.container {
  width: 100%;
  height: 100%;
}

.aside {
  background-color: #001529;
  position: relative;
  transition: width 0.3s;
}

.logo {
  display: flex;
  align-items: center;
  padding: 0 20px;
  height: 60px;
  background-color: #001529;
  border-bottom: 1px solid #1f2d3d;
}

.logo-img {
  width: 32px;
  height: 32px;
}

.logo-text {
  margin-left: 10px;
  font-size: 18px;
  font-weight: bold;
  color: #fff;
}

.menu {
  border-right: none;
  height: calc(100% - 60px);
  text-align: center;
}

.menu .el-menu-item {
  display: flex;
  align-items: center;
  justify-content: center;
}

.menu .el-menu-item .el-icon {
  margin-right: 0;
}

.menu:not(.el-menu--collapse) .el-menu-item {
  justify-content: flex-start;
}

.menu:not(.el-menu--collapse) .el-menu-item .el-icon {
  margin-right: 10px;
}

.collapse-btn {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  color: #fff;
}

.main-container {
  display: flex;
  flex-direction: column;
  background-color: #f5f7fa;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  height: 60px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgb(0 0 0 / 10%);
}

.header-title {
  font-size: 18px;
  font-weight: bold;
  color: #303133;
}

.header-user {
  display: flex;
  align-items: center;
}

.user-info {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.user-info span {
  margin-left: 10px;
}

.main {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}
</style>