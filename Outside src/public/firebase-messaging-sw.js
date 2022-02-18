/*******************
**  VERSION INFO  **

Version from Feb 17, exactly copied from official Firebase QuickStart:

https://github.com/firebase/quickstart-js/blob/master/messaging/firebase-messaging-sw.js

*/

/* Here is is the code snippet to initialize Firebase Messaging in the Service Worker when your app is not hosted on Firebase Hosting */

// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.

importScripts('https://www.gstatic.com/firebasejs/9.2.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.2.0/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object

try {
	
firebase.initializeApp({
   apiKey: "AIzaSyBGhSRGXLRM1m-nNMFNuJnSKu5AX--6vb0",
   authDomain: "godsgamefbase.firebaseapp.com",
   projectId: "godsgamefbase",
   storageBucket: "godsgamefbase.appspot.com",
   messagingSenderId: "306649763697",
   appId: "1:306649763697:web:228785d43cabe34913b0d0"
});
 
// Retrieve an instance of Firebase Messaging so that it can handle background messages.

const messaging = firebase.messaging();



// If you would like to customize notifications that are received in the
// background (Web app is closed or not in browser focus) then you should
// implement this optional method.
// Keep in mind that FCM will still show notification messages automatically 
// and you should use data messages for custom notifications.
// For more info see: 
// https://firebase.google.com/docs/cloud-messaging/concept-options
messaging.onBackgroundMessage(function(payload) {

	console.log('[firebase-messaging-sw.js] Received background message ', payload);
	
	const title = 'title'
	const body = 'payload.data = '
	const options = {
		body: body,
		// icon: 'public/path/to/icon.png'
	}
	
	self.registration.showNotification(title, options)
	
});


} catch (err) {
	console.log(err)
}