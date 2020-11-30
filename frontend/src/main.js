import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import vuetify from './plugins/vuetify'
import '@/styles/tiptap/main.scss'
import '@/styles/variables.scss'
import '@/plugins/vee-validate'

Vue.config.productionTip = false

document.title = 'Kapliff - Devlog'

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
