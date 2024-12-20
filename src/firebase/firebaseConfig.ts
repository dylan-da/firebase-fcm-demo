import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Cloud Messaging
const messaging = getMessaging(app);

// Request FCM Token and append to HTML
export const requestFCMPermission = async (): Promise<void> => {
  try {
    const token = await getToken(messaging, {
      vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
    });

    if (token) {
      console.log("FCM Token:", token);
      
      const tokenElement = document.createElement("div");
      tokenElement.id = "fcm-token";
      tokenElement.style.margin = "20px";
      tokenElement.style.padding = "10px";
      tokenElement.style.border = "1px solid #ccc";
      tokenElement.style.backgroundColor = "#f9f9f9";
      tokenElement.textContent = `FCM Token: ${token}`;
      document.body.appendChild(tokenElement);

      // Alternatively, update an existing element
      const existingTokenElement = document.getElementById("fcm-token-display");
      if (existingTokenElement) {
        existingTokenElement.textContent = `FCM Token: ${token}`;
      }
    } else {
      console.log("No FCM registration token available.");
    }
  } catch (error) {
    console.error("Error getting FCM token:", error);
  }
};

// Listen for foreground messages
export const onMessageListener = (): Promise<any> =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });

export { app, messaging };