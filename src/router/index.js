import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: '/',
    redirect: '/home/index'
  },
  {
    path: '/user/login',
    name: '/user/login',
    component: () => import('../views/user/Login.vue')
  },
  {
    path: '/user/registry',
    name: '/user/registry',
    component: () => import('../views/user/Registry.vue')
  },
  {
    path: '/home',
    name: '/home',
    component: () => import('../views/home/Home.vue'),
    children: [
      {
        path: 'index',
        name: 'index',
        component: () => import('../views/home/Index.vue'),
      },
      {
        path: 'guang',
        name: 'guang',
        component: () => import('../views/home/Guang.vue'),
      },
      {
        path: 'message',
        name: 'message',
        component: () => import('../views/home/Message.vue'),
      },
      {
        path: 'platform',
        name: 'platform',
        component: () => import('../views/home/Platform.vue'),
      },
    ]
  },
  {
    path: '/product/category',
    name: '/product/category',
    component: () => import('../views/product/Category.vue')
  },
  {
    path: '/product/list/category/:id',
    name: '/product/list/category',
    component: () => import('../views/product/ListByCategoryId.vue')
  },
  {
    path: '/product/list/search',
    name: '/product/list/search',
    component: () => import('../views/product/ListBySearchKeyword.vue')
  },
  {
    path: '/product/seckill-list',
    name: '/product/seckill-list',
    component: () => import('../views/product/ListBySeckill.vue')
  },
  {
    path: '/product/seckill-detail/:id',
    name: '/product/seckill-detail',
    component: () => import('../views/product/SeckillDetail.vue')
  },
  {
    path: '/product/detail/:id',
    name: '/product/detail',
    component: () => import('../views/product/Detail.vue')
  },
  {
    path: '/product/cart',
    name: '/product/cart',
    component: () => import('../views/product/Cart.vue')
  },
  {
    path: '/order/order-confirm',
    name: '/order/orderConfirm',
    component: () => import('../views/order/OrderConfirm.vue')
  },
  {
    path: '/order/seckill-order-confirm',
    name: '/order/seckillOrderConfirm',
    component: () => import('../views/order/SeckillOrderConfirm.vue')
  },
  {
    path: '/order/payorder-method',
    name: '/order/payorder-method',
    component: () => import('../views/order/PayOrderMethod.vue')
  },
  {
    path: '/order/payorder-success',
    name: '/order/payorder-success',
    component: () => import('../views/order/PayOrderSuccess.vue')
  },
  {
    path: '/order/orderlist',
    name: '/order/orderlist',
    component: () => import('../views/order/OrderList.vue')
  },
  {
    path: '/order/addresslist',
    name: '/order/addresslist',
    component: () => import('../views/order/AddressList.vue')
  },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0}
  },
})

export default router
