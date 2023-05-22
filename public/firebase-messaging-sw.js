// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
    apiKey: "AIzaSyAMftp438hipg7brf2-ohrEmCRKoDmCH9Q",
    authDomain: "kost-catleya.firebaseapp.com",
    projectId: "kost-catleya",
    storageBucket: "kost-catleya.appspot.com",
    messagingSenderId: "224778676501",
    appId: "1:224778676501:web:9988a6917c6524f545211c",
    measurementId: "G-7CDGTFL0VN"
  });

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
    this.devLog(
      '[firebase-messaging-sw.js] Received background message ',
      payload
    );
    // Customize notification here
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
      body: payload.notification.body,
      icon: '/img/Frame2.png'
    };
  
    return self.registration.showNotification(notificationTitle, notificationOptions);
  });