import { createWebHistory , createRouter } from 'vue-router'

const HomePage = () => import(/* webpackChunkName: "home" */ '@/Home.vue')
const AboutPage = () => import(/* webpackChunkName: "about" */ '@/About.vue')

const routes = [
  { path: '/', component: HomePage },
  { path: '/about', component: AboutPage },
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})