import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from '@/app.vue'
import { router } from '@/routing'
import { registerDirectives } from '@/directives/register'

const pinia = createPinia()
const app = createApp(App)

registerDirectives(app);
app.use(pinia)
app.use(router);

app.mount('#root')
