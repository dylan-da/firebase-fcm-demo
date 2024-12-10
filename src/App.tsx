import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { requestFCMPermission, onMessageListener } from "./firebase/firebaseConfig";

function App() {
  const [count, setCount] = useState(0);
  const [notification, setNotification] = useState<string | null>(null);

  // Request FCM permissions and handle foreground notifications
  useEffect(() => {
    // Request notification permissions
    requestFCMPermission();

    // Listen for foreground notifications
    onMessageListener()
      .then((payload) => {
        console.log("Foreground notification received:", payload);
        const title = payload.notification?.title || "Notification received";
        setNotification(title);
      })
      .catch((error) => console.error("Error in notification listener:", error));
  }, []);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      {notification && (
        <div className="notification">
          <p>{notification}</p>
        </div>
      )}
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;