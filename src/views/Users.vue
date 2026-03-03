<template>
  <div class="users">
    <el-card shadow="hover">
      <template #header>
        <div class="card-header">
          <span>用户管理</span>
          <div class="header-actions">
            <el-input
              v-model="searchQuery"
              placeholder="搜索用户"
              prefix-icon="Search"
              style="width: 300px"
              @keyup.enter="handleSearch"
            />
            <el-button type="primary" icon="Plus" @click="handleAddUser">
              添加用户
            </el-button>
          </div>
        </div>
      </template>
      
      <el-table :data="filteredUsers" style="width: 100%">
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="name" label="姓名" width="180" />
        <el-table-column prop="email" label="邮箱" />
        <el-table-column prop="role" label="角色" width="120" />
        <el-table-column prop="status" label="状态" width="120">
          <template #default="scope">
            <el-tag :type="scope.row.status === 'active' ? 'success' : 'danger'">
              {{ scope.row.status === 'active' ? '活跃' : '禁用' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150" fixed="right">
          <template #default="scope">
            <el-button type="primary" size="small" icon="Edit" @click="handleEditUser(scope.row)" />
            <el-button type="danger" size="small" icon="Delete" @click="handleDeleteUser(scope.row)" />
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    
    <el-dialog
      v-model="dialogVisible"
      :title="editingUser ? '编辑用户' : '添加用户'"
    >
      <el-form :model="form" label-width="80px">
        <el-form-item label="姓名">
          <el-input v-model="form.name" placeholder="请输入姓名" />
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="form.email" placeholder="请输入邮箱" />
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="form.role" placeholder="请选择角色">
            <el-option label="管理员" value="管理员" />
            <el-option label="普通用户" value="普通用户" />
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="form.status">
            <el-radio label="active">活跃</el-radio>
            <el-radio label="inactive">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleSaveUser">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Search, Plus, Edit, Delete } from '@element-plus/icons-vue'

interface User {
  id: number
  name: string
  email: string
  role: string
  status: 'active' | 'inactive'
}

const users = ref<User[]>([
  { id: 1, name: '张三', email: 'zhangsan@example.com', role: '管理员', status: 'active' },
  { id: 2, name: '李四', email: 'lisi@example.com', role: '普通用户', status: 'active' },
  { id: 3, name: '王五', email: 'wangwu@example.com', role: '普通用户', status: 'inactive' },
  { id: 4, name: '赵六', email: 'zhaoliu@example.com', role: '普通用户', status: 'active' },
  { id: 5, name: '钱七', email: 'qianqi@example.com', role: '普通用户', status: 'active' }
])

const searchQuery = ref('')
const dialogVisible = ref(false)
const editingUser = ref<User | null>(null)
const form = ref({
  name: '',
  email: '',
  role: '普通用户',
  status: 'active' as 'active' | 'inactive'
})

const filteredUsers = ref<User[]>(users.value)

const handleSearch = () => {
  if (!searchQuery.value) {
    filteredUsers.value = users.value
    return
  }
  filteredUsers.value = users.value.filter(user => 
    user.name.includes(searchQuery.value) || 
    user.email.includes(searchQuery.value) ||
    user.role.includes(searchQuery.value)
  )
}

const handleAddUser = () => {
  editingUser.value = null
  form.value = {
    name: '',
    email: '',
    role: '普通用户',
    status: 'active'
  }
  dialogVisible.value = true
}

const handleEditUser = (user: User) => {
  editingUser.value = user
  form.value = { ...user }
  dialogVisible.value = true
}

const handleDeleteUser = (user: User) => {
  ElMessageBox.confirm(
    `确定要删除用户 ${user.name} 吗？`,
    '警告',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }
  ).then(() => {
    const index = users.value.findIndex(u => u.id === user.id)
    if (index !== -1) {
      users.value.splice(index, 1)
      handleSearch()
      ElMessage.success('删除成功')
    }
  }).catch(() => {
    // 取消删除
  })
}

const handleSaveUser = () => {
  if (!form.value.name || !form.value.email) {
    ElMessage.error('请填写完整的用户信息')
    return
  }
  
  if (editingUser.value) {
    // 更新现有用户
    const index = users.value.findIndex(u => u.id === editingUser.value!.id)
    if (index !== -1) {
      users.value[index] = { ...form.value, id: editingUser.value!.id }
      ElMessage.success('更新成功')
    }
  } else {
    // 添加新用户
    const newUser: User = {
      id: users.value.length + 1,
      ...form.value
    }
    users.value.push(newUser)
    ElMessage.success('添加成功')
  }
  
  dialogVisible.value = false
  handleSearch()
}
</script>

<style scoped>
.users {
  width: 100%;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
</style>