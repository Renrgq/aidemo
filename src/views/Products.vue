<template>
  <div class="products">
    <el-card shadow="hover">
      <template #header>
        <div class="card-header">
          <span>产品管理</span>
          <div class="header-actions">
            <el-input
              v-model="searchQuery"
              placeholder="搜索产品"
              prefix-icon="Search"
              style="width: 300px"
              @keyup.enter="handleSearch"
            />
            <el-button type="primary" icon="Plus" @click="handleAddProduct">
              添加产品
            </el-button>
          </div>
        </div>
      </template>
      
      <el-table :data="filteredProducts" style="width: 100%">
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="name" label="产品名称" width="180" />
        <el-table-column prop="price" label="价格" width="120">
          <template #default="scope">
            ¥ {{ scope.row.price }}
          </template>
        </el-table-column>
        <el-table-column prop="stock" label="库存" width="120" />
        <el-table-column prop="status" label="状态" width="120">
          <template #default="scope">
            <el-tag :type="scope.row.status === 'in_stock' ? 'success' : 'danger'">
              {{ scope.row.status === 'in_stock' ? '有库存' : '缺货' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150" fixed="right">
          <template #default="scope">
            <el-button type="primary" size="small" icon="Edit" @click="handleEditProduct(scope.row)" />
            <el-button type="danger" size="small" icon="Delete" @click="handleDeleteProduct(scope.row)" />
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    
    <el-dialog
      v-model="dialogVisible"
      :title="editingProduct ? '编辑产品' : '添加产品'"
    >
      <el-form :model="form" label-width="80px">
        <el-form-item label="产品名称">
          <el-input v-model="form.name" placeholder="请输入产品名称" />
        </el-form-item>
        <el-form-item label="价格">
          <el-input-number v-model="form.price" :min="0" placeholder="请输入价格" />
        </el-form-item>
        <el-form-item label="库存">
          <el-input-number v-model="form.stock" :min="0" placeholder="请输入库存" />
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="form.status">
            <el-radio label="in_stock">有库存</el-radio>
            <el-radio label="out_of_stock">缺货</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleSaveProduct">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Search, Plus, Edit, Delete } from '@element-plus/icons-vue'

interface Product {
  id: number
  name: string
  price: number
  stock: number
  status: 'in_stock' | 'out_of_stock'
}

const products = ref<Product[]>([
  { id: 1, name: '产品A', price: 100, stock: 50, status: 'in_stock' },
  { id: 2, name: '产品B', price: 200, stock: 0, status: 'out_of_stock' },
  { id: 3, name: '产品C', price: 150, stock: 30, status: 'in_stock' },
  { id: 4, name: '产品D', price: 250, stock: 20, status: 'in_stock' },
  { id: 5, name: '产品E', price: 300, stock: 0, status: 'out_of_stock' }
])

const searchQuery = ref('')
const dialogVisible = ref(false)
const editingProduct = ref<Product | null>(null)
const form = ref({
  name: '',
  price: 0,
  stock: 0,
  status: 'in_stock' as 'in_stock' | 'out_of_stock'
})

const filteredProducts = ref<Product[]>(products.value)

const handleSearch = () => {
  if (!searchQuery.value) {
    filteredProducts.value = products.value
    return
  }
  filteredProducts.value = products.value.filter(product => 
    product.name.includes(searchQuery.value)
  )
}

const handleAddProduct = () => {
  editingProduct.value = null
  form.value = {
    name: '',
    price: 0,
    stock: 0,
    status: 'in_stock'
  }
  dialogVisible.value = true
}

const handleEditProduct = (product: Product) => {
  editingProduct.value = product
  form.value = { ...product }
  dialogVisible.value = true
}

const handleDeleteProduct = (product: Product) => {
  ElMessageBox.confirm(
    `确定要删除产品 ${product.name} 吗？`,
    '警告',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }
  ).then(() => {
    const index = products.value.findIndex(p => p.id === product.id)
    if (index !== -1) {
      products.value.splice(index, 1)
      handleSearch()
      ElMessage.success('删除成功')
    }
  }).catch(() => {
    // 取消删除
  })
}

const handleSaveProduct = () => {
  if (!form.value.name || form.value.price <= 0) {
    ElMessage.error('请填写完整的产品信息')
    return
  }
  
  if (editingProduct.value) {
    // 更新现有产品
    const index = products.value.findIndex(p => p.id === editingProduct.value!.id)
    if (index !== -1) {
      products.value[index] = { ...form.value, id: editingProduct.value!.id }
      ElMessage.success('更新成功')
    }
  } else {
    // 添加新产品
    const newProduct: Product = {
      id: products.value.length + 1,
      ...form.value
    }
    products.value.push(newProduct)
    ElMessage.success('添加成功')
  }
  
  dialogVisible.value = false
  handleSearch()
}
</script>

<style scoped>
.products {
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