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

/* Based on:
	
	https://dev.to/vbanditv/how-to-add-fcm-firebase-cloud-messaging-to-vuejs-37np)
*/

import firebase from 'firebase/app'
import 'firebase/firebase-messaging'

const firebaseConfig = {
  apiKey: "AIzaSyBGhSRGXLRM1m-nNMFNuJnSKu5AX--6vb0",
  authDomain: "godsgamefbase.firebaseapp.com",
  projectId: "godsgamefbase",
  storageBucket: "godsgamefbase.appspot.com",
  messagingSenderId: "306649763697",
  appId: "1:306649763697:web:228785d43cabe34913b0d0"
};
vue_app.messaging = getMessaging(gods_firebase)

// ↓ In this version, we don't export gods_firebase, vue_app, or vue_app.messaging. But I sometimes keep them in the code, even if they do nothing.
const gods_firebase = firebase.initializeApp(firebaseConfig);
let gods_fcm = firebase.messaging()
console.log(gods_fcm)

export { gods_fcm }

// would continue with https://firebase.google.com/docs/cloud-messaging/js/receive