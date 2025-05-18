import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store.ts";
import { StrictMode } from "react";
import { AuthProvider } from "./contexts/AuthContext";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Provider>
  </StrictMode>
);
