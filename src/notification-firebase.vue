<script>
export default{
  name: 'notif-firebase'
}

import { initializeApp } from "firebase/app";
import { getMessaging, onMessage, getToken } from "firebase/messaging";
// import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyAMftp438hipg7brf2-ohrEmCRKoDmCH9Q",
  authDomain: "kost-catleya.firebaseapp.com",
  projectId: "kost-catleya",
  storageBucket: "kost-catleya.appspot.com",
  messagingSenderId: "224778676501",
  appId: "1:224778676501:web:9988a6917c6524f545211c",
  measurementId: "G-7CDGTFL0VN",
  serviceAccountId: 'firebase-adminsdk-6zi5y@kost-catleya.iam.gserviceaccount.com'
};

const app = initializeApp(firebaseConfig);
console.log(app)

// Get registration token. Initially this makes a network call, once retrieved
// subsequent calls to getToken will return from cache.
const messaging = getMessaging();
onMessage(messaging, (payload) => {
  if ( process.env.NODE_ENV == 'development' ) {
      console.log('Message received. ', payload);
  }

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
      body: payload.notification.body,
      icon: payload.notification.icon,        
  };

  if (!("Notification" in window)) {
      console.log("This browser does not support system notifications");
  }
  // Let's check whether notification permissions have already been granted
  else if (Notification.permission === "granted") {
      // If it's okay let's create a notification
      var notification = new Notification(notificationTitle,notificationOptions);
      notification.onclick = function(event) {
          event.preventDefault(); // prevent the browser from focusing the Notification's tab
          window.open(payload.notification.click_action , '_blank');
          notification.close();
      }
  }

  navigator.serviceWorker.getRegistration('/firebase-cloud-messaging-push-scope').then(registration => {
      registration.showNotification(
          payload.notification.title,
          payload.notification
      )
  });
});

// messaging.onMessage(function(payload) {
//   local_registration.active.postMessage(payload);
// });

getToken(messaging, { vapidKey: 'BP2GadiKl-yWOQDE0KnPwt9clvNWwEd9YEtFh_gm32VYqlqgToyfZ1SBoZKw-geyen17oyZhkZRSqEXK2QiLi5M' }).then((currentToken) => {
  if (currentToken) {
    // Send the token to your server and update the UI if necessary
    // console.log("Token is:",currentToken);
    localStorage.firebaseToken = currentToken;
    // ...
  } else {
    // Show permission request UI
    // this.devLog('No registration token available. Request permission to generate one.');
    // ...
  }
}).catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
  // ...
});

</script>
