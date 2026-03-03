import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/',
      component: () => import('../App.vue'),
      meta: { requiresAuth: true },
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: () => import('../views/Dashboard.vue')
        },
        {
          path: 'users',
          name: 'Users',
          component: () => import('../views/Users.vue')
        },
        {
          path: 'products',
          name: 'Products',
          component: () => import('../views/Products.vue')
        },
        {
          path: 'settings',
          name: 'Settings',
          component: () => import('../views/Settings.vue')
        }
      ]
    }
  ]
})

// 导航守卫
router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'
  
  if (to.meta.requiresAuth && !isLoggedIn) {
    // 需要登录但未登录，重定向到登录页
    next('/login')
  } else if (to.path === '/login' && isLoggedIn) {
    // 已登录但访问登录页，重定向到首页
    next('/dashboard')
  } else {
    // 其他情况正常访问
    next()
  }
})

export default router