importScripts("https://www.gstatic.com/firebasejs/11.0.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/11.0.2/firebase-messaging-compat.js");

const firebaseConfig = {
    apiKey: "AIzaSyBUBlA8mZAetHrflR8NQUI00K0tFZ-G3Ro",
    authDomain: "test-244e1.firebaseapp.com",
    projectId: "test-244e1",
    storageBucket: "test-244e1.firebasestorage.app",
    messagingSenderId: "1083668648398",
    appId: "1:1083668648398:web:1cee559ff2f27c09065b9f",
  };

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log("[firebase-messaging-sw.js] Received background message:", payload);

  const notificationTitle = payload.notification?.title || "Background Notification";
  const notificationOptions = {
    body: payload.notification?.body,
    icon: payload.notification?.icon || "/favicon.ico",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});