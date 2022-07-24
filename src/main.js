import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import Vant from 'vant';
import 'vant/lib/index.css';
import Bridge from './utils/JSbridge'
// import VConsole from 'vconsole';
// const vconsole = new VConsole();
// export default vconsole
const app = createApp(App);
app.config.globalProperties.$bridge = Bridge
app.use(router)
app.use(Vant)
app.mount('#app')
