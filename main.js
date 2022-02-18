import Vue from 'vue'

import App from './App.vue'
export const bus = new Vue()

// Error logging
let l = function (to_log) { 
	console.log(to_log) 
}
let lo = l

/************
**  Axios 
**  (unused)
**
**************
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)
*/


/************
**
**  Firebase (service worker part )
**
*************/

// Register service worked in standard vanillla JS way
// 
// (Alt method at https://dev.to/vbanditv/how-to-add-fcm-firebase-cloud-messaging-to-vuejs-37np)

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('firebase-messaging-sw.js')
	.then(reg => {
	  console.log(`Service Worker Registered (Scope: ${reg.scope})`);
	})
	.catch(error => {
	  const msg = `Service Worker Error (${error})`;
	  console.error(msg);
	});
} else {
  // happens when the app isn't served over HTTPS or if the browser doesn't support service workers
  console.warn('Service Worker not available');
}

/***************
**
**  Vue basics 
**
***************/

Vue.config.productionTip = false

var vue_app = new Vue({
  render: h => h(App),
}).$mount('#app')

/************
**
**  Firebase
**  (recreating on the main app thread, 
**  in addition to the service worker)
**
*************/

