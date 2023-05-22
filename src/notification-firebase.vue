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
  console.log('Message received. ', payload);
  // ...
});

getToken(messaging, { vapidKey: 'BP2GadiKl-yWOQDE0KnPwt9clvNWwEd9YEtFh_gm32VYqlqgToyfZ1SBoZKw-geyen17oyZhkZRSqEXK2QiLi5M' }).then((currentToken) => {
  if (currentToken) {
    // Send the token to your server and update the UI if necessary
    console.log("Token is:",currentToken);
    localStorage.firebaseToken = currentToken;
    // ...
  } else {
    // Show permission request UI
    console.log('No registration token available. Request permission to generate one.');
    // ...
  }
}).catch((err) => {
  console.log('An error occurred while retrieving token. ', err);
  // ...
});

</script>
