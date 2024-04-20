import { createWebHistory , createRouter } from 'vue-router'

const HomePage = () => import(/* webpackChunkName: "home" */ '@/pages/home.vue')
const CartPage = () => import(/* webpackChunkName: "about" */ '@/pages/cart.vue')

const routes = [
  { path: '/', component: HomePage },
  { path: '/cart', component: CartPage },
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})