import { FirebaseDataProvider } from "./contexts/FirebaseDataContext";
import { ThemeProvider } from "./contexts/ThemeContext.tsx";
import { AuthProvider } from "./contexts/AuthContext";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store.ts";
import { StrictMode } from "react";
import App from "./App.tsx";
import "./styles/theme.css";
import "./index.css";
import "./i18n.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <FirebaseDataProvider>
        <ThemeProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </ThemeProvider>
      </FirebaseDataProvider>
    </Provider>
  </StrictMode>
);
