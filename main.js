import Vue from 'vue'

import App from './App.vue'
export const bus = new Vue()


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
**  Firebase 
**
*************/

// import firebaseMessaging from './preload/firebase'
// Vue.prototype.$messaging = firebaseMessaging
// 
// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker.register('firebase-messaging-sw.js')
// 	.then(reg => {
// 	  console.log(`Service Worker Registration (Scope: ${reg.scope})`);
// 	})
// 	.catch(error => {
// 	  const msg = `Service Worker Error (${error})`;
// 	  console.error(msg);
// 	});
// } else {
//   // happens when the app isn't served over HTTPS or if the browser doesn't support service workers
//   console.warn('Service Worker not available');
// }

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
**
*************/

import { initializeApp } from "firebase/app";

// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBGhSRGXLRM1m-nNMFNuJnSKu5AX--6vb0",
  authDomain: "godsgamefbase.firebaseapp.com",
  projectId: "godsgamefbase",
  storageBucket: "godsgamefbase.appspot.com",
  messagingSenderId: "306649763697",
  appId: "1:306649763697:web:228785d43cabe34913b0d0"
};
// 
// // Initialize Firebase
const gods_firebase = initializeApp(firebaseConfig);

// FCM: Firebase Cloud Messaging
import {getMessaging} from "firebase/messaging";
vue_app.messaging = getMessaging()
console.log(vue_app.messaging)
vue_app.messaging.getToken({vapidKey: "BACyAFjs1KoHzgCkmXllHlmBBqj6yLbxcJSD4wjxjN-bJKl6zaWSevcaxkanK0RD05GJrPK-1yHodls6kGoaf4w"});
