import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

import App from './App.vue'

Vue.config.productionTip = false

export const bus = new Vue()

new Vue({
  render: h => h(App),
}).$mount('#app')
