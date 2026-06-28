import { createRoot } from "react-dom/client";
import App from "./App";
import "./fonts.css";
import "./index.css";
import "./embedded-fonts.css";

// Add font loading check
window.addEventListener('load', () => {
  document.fonts.ready.then(() => {
    console.log('All fonts loaded');
    // Force repaint
    document.body.style.display = 'none';
    document.body.offsetHeight;
    document.body.style.display = '';
  });
});

createRoot(document.getElementById("root")!).render(<App />);

// Register the service worker for PWA / offline support (production only)
if ("serviceWorker" in navigator && import.meta.env.PROD) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js").catch((err) => {
      console.error("Service worker registration failed:", err);
    });
  });
}
